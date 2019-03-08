public class PSEADashboardCarouselController {
    @AuraEnabled
    public static String getConfig(String configId) {
        System.debug('configId=' + configId);
        
        try
        {      
            PSEADashboardCarousel__c car = [SELECT Id, Name__c, Refresh_Interval__c, Transition_Interval__c FROM PSEADashboardCarousel__c WHERE Id = :configId LIMIT 1];
            List<PSEADashboardCarouselItem__c> items = [SELECT Id, Order__c, Dashboard_Name__c, Page_ID__c, Filter__c 
                                                          FROM PSEADashboardCarouselItem__c 
                                                         WHERE PSEADashboardCarousel__c = :car.Id
                                                         ORDER BY Order__c ASC];
 
            Config config = new Config();
            config.configId = car.Id;
            config.configname = car.Name__c;
            config.transitionInterval = (Integer)car.Transition_Interval__c;
            config.refreshInterval = (Integer)car.Refresh_Interval__c;

            for (PSEADashboardCarouselItem__c item : items)
            {
                String filter = item.Filter__c;
                if (filter != null)
                {
                    filter = filter.replaceAll('<<USER_ID>>', UserInfo.getUserId());
                }
                config.addItem(item.Dashboard_Name__c, item.Page_ID__c, filter);
            }

System.debug(JSON.serialize(config));
            return JSON.serialize(config);
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }

    }

   public class Config
   {
     public String configId;
     public String configName;
     public Integer transitionInterval;
     public Integer refreshInterval;

     public List<ConfigItem> items = new List<ConfigItem>();

     public void addItem(String dashboardName, String pageId, String filter)
     {
         ConfigItem ci = new ConfigItem();
         ci.dashboardName = dashboardName;
         ci.pageId = pageId;
         ci.filter = filter;
         items.add(ci);
     }
   }

   public class ConfigItem
   {
       public String dashboardName;
       public String pageId;
       public String filter;
   }
}