# PSEADashboardCarousel
This component provides ability for a configured list of Einstein Analytic dashboards to be shown in a carousel. The carousel provides automatic rotation of dashboards on a configurable transition interval (seconds). This component utilizes the [Flickity](https://flickity.metafizzy.co/) javascript library for the primary carousel functionality. Here is video of the component in action:

![alt text](https://github.com/thedges/PSEADashboardCarousel/blob/master/PSEADashboardCarousel.gif "PSEADashboardCarousel Video")

<b>Other features of the carousel include following capabilities (see controls in top-right of component):</b>
* Pause the carousel so that one can interact with a dashboard  
* Continue the automatic rotation of carousel after a pause (i.e. play)
* Kick-out out to a visualforce page of the component so that carousel can then be shown full screen for command center scenarios
* Apply filters to dashboards
* Support of Einstein Analytics Dashboard pages

<b>The following controls exist for the component:</b>

![alt text](https://github.com/thedges/PSEADashboardCarousel/blob/master/PSEADashboardCarousel.png "PSEADashboardCarousel Controls")
1. This area provides 4 primary controls which will show based current state of carousel:
   * <img src="https://github.com/thedges/PSEADashboardCarousel/raw/master/pause.png" height="25"/> pause the carousel
   * <img src="https://github.com/thedges/PSEADashboardCarousel/raw/master/play.png" height="25"/> un-pause or play the carousel
   * <img src="https://github.com/thedges/PSEADashboardCarousel/raw/master/launch.png" height="25"/> launch out to a plain Visualforce page (ultimately you can go full screen)
   * <img src="https://github.com/thedges/PSEADashboardCarousel/raw/master/fullscreen.png" height="25"/> show component in fullscreen mode; primarily used for command center or second monitor
2. Move the carousel to the left (selecting this automatically pauses the carousel)
3. Move the carousel to the right (selecting this automatically pauses the carousel)
4. Dots represent the dashboards in the carousel. Pick on a specific dot to show that dashboard (selecting a slide automatically pauses the carousel)

<b>The component is configurable by 2 custom objects:</b>
1. PSEADashboardCarousel
   * <b>Name</b> - provide a name for your carousel configuration. This will be utilized in the component configuration screen inside the Lightning App Builder
   * <b>Transition Interval</b> - the time in seconds to transition between dashboard 
   * <b>Refresh Interval</b> - the time in minutes to automatically refresh the carousel with new dashboard data. Note, the refresh does not occur while in 'pause' mode. If a refresh is detected while paused, the carousel component will perform the refresh when use selected 'play' option.
2. PSEADashboardCarouselItem
   * <b>Dashboard Name</b> - the developer name of the Einstein Analytics dashboard
   * <b>Page ID</b> - provide a page id if you want a specific page selected for the dashboard
   * <b>Filter</b> - provide a filter string if you want to dynamically filter your dashboard. Currently component only supports one substitution variable. Use the keyword '<<USER_ID>>' in your filter string anywhere that you want the current user id substituted.



<b>To use the component, perform the following steps:</b>
1. Install the component using the '<b>Deploy to Salesforce</b>' button below
2. Assign the '<b>PSEADashboardCarousel</b>' permission set to the users that will utilize the component
3. Navigate to the <b>PSEADashboardCarousel</b> tab and create a carousel configuration. 
   * First create a PSEADashboardCarousel record to define your configuration
   * Next create 1 or more PSEADashboardCarouselItem records to specify the dashboards to include in your carousel
4. For the page that you want to add the carousel component to, edit the page and use Lightning App Builder to add the component to the page. For the component configuration, select the configuration name you provided in previous step and specify a height for the component. Save the page and your component is ready. 


<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
