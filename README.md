## Spark: Mindful Artistry
<img width="698" alt="image" src="https://github.com/e-linds/Spark/assets/145630671/dfe507f0-8c67-4f14-a4bf-64bca9ead155">
<img width="694" alt="image" src="https://github.com/e-linds/Spark/assets/145630671/87242a89-1115-49ef-beb1-35a3d234e003">

Spark is the brainchild of my friends, Sophia Thaut and Claire Gunsbury. This app is designed to give musicians of all kinds (studio teachers, performers, university students, etc) a way to include mindfulness in their regular practice, and before/after performances or competitions. Their vision ultimately includes a mobile app, so I built this web app as a prototype - it includes most of their desired functionality and styling, and can eventually be used in a mobile app build. 

Spark is built using React and Vite, and uses Flask/SQLAlchemy on the backend for database management. Dependencies include MUI Material, the React YouTube player component, and Pico CSS, which was used for initial simple structuring. Most styling is done from scratch.  

A proxy server (included in the src/vite.config file) is used to run the frontend, to avoid CORS errors. Once deployed, this will be removed. 

## To run the backend:
```
cd server
pipenv install && pipenv shell
python app.py
```
## To run the frontend:
```
cd client
npm run dev
```

## Summary
The founders of Spark have curated a list of video snippets ("sessions") to include in the Spark Library, which will be included in the app from the backend and are available to all users. On the frontend, users can view all items in the Spark Library, filter by category, and add items to their "My Sparks" page. A user's sparks will be immediately accessible and are intended to become regular tools for the musician. 

In addition to the sessions, users can view all practitioners whose sessions ae included in the library, and can view sessions grouped by practitioner.  

The app also includes secure user authentication functionality. 

## Coming soon:
* Users can search the library by keyword for a specific session or practitioner
* Users can track their daily streak of viewing a session
* Videos are hosted within the platform, and not linked in from an external site








