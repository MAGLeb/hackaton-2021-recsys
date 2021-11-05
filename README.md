# The recommendation system for Moscow library
## The project was created as part of a [hackathon](https://leaders2021.innoagency.ru/)

### References
1. [Tech documentation](https://docs.google.com/document/d/1-P_eh0A3zyvD_QDpySUOEnNnpMI2gmuP5tEX6U6eaqI/edit)
2. [Drafts of the interface](https://www.figma.com/file/qCCjWhQe4eN9AReOgzGKrt/Library-%2F-Hackaton-%2F-RecSys?node-id=0%3A1)
3. [Presentation](https://docs.google.com/presentation/d/1vILvRbiWEYGSg7-cRUg88iBYqWKaj0ZGXEksY_YuFOY/edit#slide=id.gf751429f91_4_72)
4. [Site](https://svetlanatselikova.github.io/library-app/)
5. [Data GoogleDisk](https://drive.google.com/drive/folders/1soNwrx75x-dUdMYZnOxSN1RMEnu_FH38?usp=sharing)


## Local app running instruction

### Installing dependencies
For correct application running you need to install all necessary dependencies (only once). Run following bash script from root directory of project to install all necessary dependencies on Ubuntu in one action:
 `./run-scripts/install-main-dependencies`

OR install all necessary dependencies by yourself: python3.8, pip, nodejs, npm and run following terminal commands `pip install -r requirements.txt`, `cd frontend`, `npm install`.

### Local app run
1. In terminal from root directory of project execute `./run-scripts/run-backend` (for running backend)
2. In other terminal tab from root directory of project execute `./run-scripts/run-frontend` (for running frontend)
3. Open your browser at http://localhost:3000 to view app with interface or use http://localhost:5000 for local api calls.
