# library_rec_sys

### Installing dependencies
For correct application running you need to install all necessary dependencies (only once). Run following bash script from root directory of project to install all necessary dependencies on Ubuntu in one action:
 `./run-scripts/install-main-dependencies`

OR install all necessary dependencies by yourself: python3.8, pip, nodejs, npm and run following terminal commands `pip install -r requirements.txt`, `cd frontend`, `npm install`.

### Local app run
1. In terminal from root directory of project execute `./run-scripts/run-backend` (for running backend)
2. In other terminal tab from root directory of project execute `./run-scripts/run-frontend` (for running frontend)
3. Open your browser at http://localhost:3000 to view app with interface or use http://localhost:5000 for local api calls.