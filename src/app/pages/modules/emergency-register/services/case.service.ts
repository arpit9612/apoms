import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/core/services/http/crud.service';
import { EmergencyCase } from 'src/app/core/models/emergency-record';
import { EmergencyResponse } from 'src/app/core/models/responses';
import { OnlineStatusService } from 'src/app/core/services/online-status.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CaseService extends CrudService {

  constructor(
    http: HttpClient,
    private readonly onlineStatus: OnlineStatusService,
    protected storage: StorageService
    ) {
      super(http);
      this.online = this.onlineStatus.isOnline;
      this.checkStatus(onlineStatus);
    }

    endpoint = 'EmergencyRegister';
    response: EmergencyResponse;
    redirectUrl: string;

    online: boolean;

    private async checkStatus(onlineStatus: OnlineStatusService)
    {
        onlineStatus.connectionChanged.subscribe(async online => {
            if (online) {
              this.online = true;
              //TODO push this message to the user in snackbar
              console.log("We're online: online = " + online);

              await this.postFromLocalStorage(this.storage.getItemArray("POST")).then((result) => {

                //TODO Push a message to the user
                console.log("Synched new cases with server");
              })
              .catch((error) => {
                console.log(error);
              });

              await this.putFromLocalStorage(this.storage.getItemArray("PUT")).then((result) => {

                //TODO Push a message to the user
                console.log("Synched updated cases with server");
              })
              .catch((error) => {
                console.log(error);
              });


            } else {
              this.online = false;
              //TODO push this message to the user in snackbar
              console.log("We're offline: online = " + online);
            }
          });
    }

  private async postFromLocalStorage(postsToSync)
  {
    let promiseArray = postsToSync.map(async elem =>
      await this.baseInsertCase(elem.value).then((result:EmergencyResponse) =>
      {
        //TODO deal with failures that will never make it into the database
        if(result.status == "success" || result.status == "rejected" || result.status == "duplicate"){
          this.storage.remove(elem.key);
        }
      }));

    return await Promise.all(promiseArray).then((result) => {return result});
  }

  private async putFromLocalStorage(putsToSync)
  {

    let promiseArray = putsToSync.map(async elem =>
      await this.baseUpdateCase(elem.value).then((result:EmergencyResponse) =>
      {
        //TODO deal with failures that will never make it into the database
        if(result.status == "success" || result.status == "rejected" || result.status == "duplicate"){
          this.storage.remove(elem.key);
        }
      })

      );

    return await Promise.all(promiseArray).then((result) => {return result});;
  }

  public async baseInsertCase(emergencyCase:EmergencyCase): Promise<any>
  {
    //Insert the new emergency record
    return await this.post(emergencyCase);

  }

  public async updateCase(emergencyCase:EmergencyCase): Promise<any>{

    return await this.baseUpdateCase(emergencyCase)
    .catch(async (error) => {

      if(error.status == 504 || !this.online)
      {
        //The server is offline, so let's save this to the database
        return await this.saveToLocalDatabase("PUT", emergencyCase);
      }
      });
  }

  public async baseUpdateCase(emergencyCase:EmergencyCase): Promise<any>
  {
        return await this.put(emergencyCase);
  }



  public async insertCase(emergencyCase:EmergencyCase): Promise<any>
  {

    return await this.baseInsertCase(emergencyCase)
    .then((result) => {
      return result;
    }

    )
    .catch(async (error) => {

      if(error.status == 504 || !this.online)
      {
        //The server is offline, so let's save this to the database
        return await this.saveToLocalDatabase("POST", emergencyCase);
      }
      });
  }



  public async getCaseById(emergencyNumber:number)
  {
      try {

          this.response = await this.getById(emergencyNumber) as EmergencyResponse;
          if(!this.response){
              throw new Error(
                  "Unable to get Case with ID: emergencyNumber: " + emergencyNumber,
              );
          }
          return this.response;
      } catch (error) {
          //console.error('Error during login request', error);
          return Promise.reject(error);
      }
  }

  public async deleteById(emergencyNumber:number)
  {
      try {
          this.response = await this.deleteById(emergencyNumber) as EmergencyResponse;
          if(!this.response){
              throw new Error(
                "Unable to delete Case with ID: emergencyNumber: " + emergencyNumber,
              );
          }
          return this.response;
      } catch (error) {
          //console.error('Error during login request', error);
          return Promise.reject(error);
      }
  }




  private async saveToLocalDatabase(key, body)
  {
    //Make a unique identified so we don't overwrite anything in local storage.
    let guid = uuid();

    try {
      this.storage.save(key + guid, body);
      return Promise.resolve("Record successfully saved to offline storage.");
    }
    catch(error)
    {
      return Promise.reject("An error occured saving to offline storage: " + error);
    }

  }
}

