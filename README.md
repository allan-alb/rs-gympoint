<h2 align="center">RS-Gympoint</h2>
<h4 align="center">API, web and mobile application for gym management</h4>
<br><br>

 ## :computer: Languages and technologies:
  JavaScript<ul style="list-style-type:disc;">
  <li>Node.js</li>
  <li>ReactJS</li>
  <li>React Native</li>
  </ul> 

 ## About
<p align="left">
  The web application allows you to manage students, plans, enrollments and help orders, serving as the admin interface (authentication required). <br>
  The mobile application serves as the student interface, allowing them to check and register check-ins and to read and ask questions that could be answered by the admins. <br>
  The API also sends emails notifying students about their enrollments.
</p>

 ## Required:
- Git [Git](https://git-scm.com)
- Node.js [Node.js](https://nodejs.org/)
- Yarn [Yarn](https://yarnpkg.com/)
- Postgres [PostgreSQL](https://www.postgresql.org/)
- Redis [Redis](https://redis.io/)
- MongoDB [MongoDB](https://www.mongodb.com/)
- Docker [Docker](https://www.docker.com/)
- Docker Compose [Docker Compose](https://docs.docker.com/compose/)
<br>

 ## Instructions
Clone the repository:&nbsp; `git clone https://github.com/allan-alb/rs-gympoint.git`

### Backend
```bash
# go to backend folder
cd backend

# install dependencies
yarn install

# create and set your environment variables
cp .env.example .env

# start database services 
# optionally, via docker
docker-compose up -d

# create postgres database structure
yarn sequelize db:migrate

# populate database
yarn sequelize db:seed:all

# start application server
yarn dev

# in another terminal window, start job queue
yarn queue
```

### Frontend
```bash
# go to frontend folder
cd frontend

# start application
yarn start
```

### Mobile
```bash
# go to mobile folder
cd mobile

# change IP address in files /src/services/api.js and /src/config/ReactotronConfig.js to match the correct server IP address

# start metro server
npx react-native start

# in another terminal window, run application according to your mobile OS*
npx react-native run-android

# *Additional steps such as pod installs may be necessary to run on iOS
```

  

  ### :memo: License
  This project is under MIT license. Check [LICENSE](LICENSE.md) for details.
<br><hr>
  
  <small>Built as the final project for [RocketSeat](https://rocketseat.com.br/)'s Bootcamp</small>
  