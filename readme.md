# ################################################################################################
#
#                                     Caterpillar Eshop App
#
#
# ###############################################################################################

This App is composed of a frontend built in ReactJs and Backend Build in AdonisJS

- Database: Mysql
- Frontend: ReactJs
- Backend: AdonisJS

The database structure file: eshop-database.png

# ############################# Project Environement Requirements ##############################

Node: v18.16.0
Yarn: 1.22.19


# ############################### Launsh Project ###################################################

# Launsh Backend Project:

# 1 -go to the project directory and install project
cd eshop-backend/src
npm install
# 2 -run database migration
node ace migration:run
# 3 - read excel file to feed the database
node ace db:seed
# 4 - Run server
node ace serve


# Info: 
 - 1. the default port for the project is 3333 is changed you will need to change it in the frontend app environement variables (REACT_APP_API_URL)

 - 2. Configure the database connection in the .env file (default database use is named: eshop)




# Launsh Frontend Project:
# 1 - got the project directory 
cd frontend
# 2 - install packages
yarn install
# 3 - start project
yarn start



# ############################## App Credentials #########################
- Admin Account

Email: admin@caterpillar
password: admin

- Any Pre-registered User 
password: password

!! Enjoy (From Koya Dzogbema)