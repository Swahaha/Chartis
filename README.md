# HackDuke Auth0 Award Winners
Team: **Swarajh Mehta (Team lead)** (Back-end python & mongoDB with fastAPI), **Bruno Makoto** (Leaflet & layer management), **Alejandro Herera** (Front end design with React/CSS), **Hung Le** (Config set-up & Auth0 integration)

# Chártis: Navigating Education, Empowering Inclusion

![](chartis-logo.png)

## Inspiration
Our journey with Chártis began with a simple observation - Duke University has a lot of educational resources, but they are not all easily accessible to everyone. A close friend’s experience using crutches due to a leg injury highlighted a gap in the knowledge and utilization of the university’s existing accessibility features. This inspired us to create a project to bridge this gap and make education more accessible. Hopefully, Chártis could help students make the most out of their Duke experience.

## Project Goals
Our primary goal was to develop a map and navigation tool. We envisioned a platform that would seamlessly integrate open-source data with user-input markers to provide comprehensive accessibility information.

##  Building the Project
### Interactive Map and Navigation
Our project's core feature is an interactive map of Duke University. Leveraging the Open Street Maps database, we displayed a detailed map of the campus. Users can also access building floor plans to locate the nearest accessible restrooms and elevators. The routing feature enabled users to navigate to any destination on campus, with the real-time feedback of the path dynamically adjusting as they progressed. 

![Routing Demo](Routingdemo.png)
![Search bar](Search.png)


### Crowdsourcing Accessibility Data
Through a crowdsourcing feature, users can contribute data on the locations of staircases, accessible bathrooms, elevators, ramps, and more. Additionally, we introduced functionality for short-term data, such as users reporting puddles or flooded areas. Leveraging the dynamic nature of mongoDB atlas as well as its programmable triggers allows us to effectively manipulate this data. These user-generated markers are not only visible to users on the map, but they also influence the routing algorithm. For example, the algorithm can find routes that avoid staircases based on this collected data.

![UI for inputting data](datacollection.png)

## Future Development
Looking ahead, we envision several exciting developments for Chártis. We incorporated Auth0 authentication for user profiles, allowing for a personalised experience. We imagine developing this idea for increased customizability: for instance, users with crutches could customize the routing algorithm to prioritize routes with short, manageable staircases (such as the ones outside craven) instead of having to take large staircases or none at all. This dynamic adaptation would further enhance the user experience and inclusivity of the platform.

<p align="center">
  <img src="login.png" alt="The current Chártis Auth-0 integration" width="200"/>
</p>

## Challenges
Building Chártis came with its fair share of challenges. Making the user-inputted data modulate the models we made for routing required a lot of problem solving and collaboration. We also challenged ourselves to imagine how we could make the project more accessible resulting in some over-ambitious features that had to be scaled back due to time constraints. This was also the first full stack project and first hackathon for half our team, so despite the challenges, we are all really happy with what we accomplished this week.

In conclusion, Chártis is a navigation tool with the goal to make education more accessible and inclusive. We hope to collaborate with Duke to make this project more available to Duke students.
