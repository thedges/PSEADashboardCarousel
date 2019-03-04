# PSEADashboardCarousel
This component provides ability for a configured list of Einstein Analytic dashboards to be shown in a carousel. The carousel provides automatic rotation of dashboards on a configurable transition interval (seconds). This component utilizes the [Flicity](https://flickity.metafizzy.co/) javascript library for the primary carousel functionality. Here is video of the component in action:

![alt text](https://github.com/thedges/PSEADashboardCarousel/blob/master/PSEADashboardCarousel.gif "PSEADashboardCarousel Video")

Other features of the carousel include following capabilities (see controls in top-right of component):
* Pause the carousel so that one can interact with a dashboard  
* Continue the automatic rotation of carousel after a pause
* Kick-out out to a visualforce page of the component so that carousel can then be shown full screen for command center scenarios
* Apply filters to dashboards
* Support of dashboard pages

The component is primarily driven based on 2 custom objects:
1. PSEADashboardCarousel
   * <b>Name</b> - provide a name for your carousel configuration. This will be utilized in the component configuration screen inside the Lightning App Builder.
2. PSEADashboardCarouselItem
   * <b>Name</b> - 



<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
