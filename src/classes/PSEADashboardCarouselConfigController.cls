public without sharing class PSEADashboardCarouselConfigController {
    @AuraEnabled
    public static String getCarouselList() {
        
        try
        {      
           List<Carousel> carList = new List<Carousel>();
		   List<PSEADashboardCarousel__c> tmpList = [SELECT Id, Name__c, Transition_Interval__c, Refresh_Interval__c 
                                                       FROM PSEADashboardCarousel__c
                                                      ORDER BY Name__c ASC];
           for (PSEADashboardCarousel__c c : tmpList)
		   {
			   Carousel newCar = new Carousel();
			   newCar.id = c.Id;
			   newCar.name = c.Name__c;
			   if (c.Transition_Interval__c != null) newCar.transitionInterval = c.Transition_Interval__c.intValue();
			   if (c.Refresh_Interval__c != null) newCar.refreshInterval = c.Refresh_Interval__c.intValue();
			   carList.add(newCar);
		   }
           return JSON.serialize(carList);
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

    @AuraEnabled
    public static String getItemList(String carouselId) {
        
        try
        {      
           List<CarouselItem> itemList = new List<CarouselItem>();
		   List<PSEADashboardCarouselItem__c> tmpList = [SELECT Id, Order__c, PSEADashboardCarousel__c, Dashboard_Label__c, Dashboard_Name__c, 
                                                                Page_Label__c, Page_ID__c, Filter__c 
		                                                   FROM PSEADashboardCarouselItem__c
														  WHERE PSEADashboardCarousel__c = :carouselId
                                                          ORDER BY Order__c ASC];
           for (PSEADashboardCarouselItem__c i : tmpList)
		   {
			   CarouselItem newItem = new CarouselItem();
			   newItem.id = i.Id;
               newItem.carouselId = i.PSEADashboardCarousel__c;
               if (i.Order__c != null) newItem.order = i.Order__c.intValue();
               newItem.dashboardLabel = i.Dashboard_Label__c;
			   newItem.dashboardName = i.Dashboard_Name__c;
               newItem.pageLabel = i.Page_Label__c;
			   newItem.pageId = i.Page_ID__c;
			   newItem.filter = i.Filter__c;
			   itemList.add(newItem);
		   }
           return JSON.serialize(itemList);
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

	@AuraEnabled
    public static void delItem(String itemId) {
        
        try
        {      
           PSEADashboardCarouselItem__c item = new PSEADashboardCarouselItem__c();
		   item.Id = itemId;
		   delete item;
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

	@AuraEnabled
    public static String delCarousel(String carouselId) {
        
        try
        {      
           PSEADashboardCarousel__c car = new PSEADashboardCarousel__c();
		   car.Id = carouselId;
		   delete car;

           return carouselId;
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

	@AuraEnabled
    public static String saveCarousel(String carousel) {
        
        try
        {  
		   Carousel car = (Carousel)JSON.deserialize(carousel, Carousel.class);  
		   PSEADashboardCarousel__c newCar = new  PSEADashboardCarousel__c();
		   if (car.id != null) newCar.Id = car.id;
		   newCar.Name__c = car.name;
		   newCar.Transition_Interval__c = car.transitionInterval;
		   newCar.Refresh_Interval__c = car.refreshInterval;
		   upsert newCar;

           car.id = newCar.Id;

           return JSON.serialize(car);
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

    @AuraEnabled
    public static String setItemOrder(String items) {
        
        try
        {  
		   List<CarouselItem> itemList = (List<CarouselItem>)JSON.deserialize(items, List<CarouselItem>.class);  
           List<PSEADashboardCarouselItem__c> updateList = new List<PSEADashboardCarouselItem__c>();
           if (itemList != null && itemList.size() > 0)
           {
             for (Integer i=0; i<itemList.size(); i++)
             {
                 PSEADashboardCarouselItem__c newItem = new PSEADashboardCarouselItem__c();
                 newItem.Id = itemList[i].id;
                 newItem.Order__c = itemList[i].order;
                 updateList.add(newItem);
             }
             if (updateList.size() > 0) update updateList;
           }
           return '';
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

	@AuraEnabled
    public static String saveItem(String item) {
        
        try
        {  
           System.debug('saveItem invoked  ' + item);
		   CarouselItem carItem = (CarouselItem)JSON.deserialize(item, CarouselItem.class);  
		   PSEADashboardCarouselItem__c newItem = new  PSEADashboardCarouselItem__c();
		   if (carItem.id != null) newItem.Id = carItem.id;
           if (carItem.id == null) newItem.PSEADashboardCarousel__c = carItem.carouselId;
           newItem.Order__c = carItem.order;
           newItem.Dashboard_Label__c = carItem.dashboardLabel;
		   newItem.Dashboard_Name__c = carItem.dashboardName;
           newItem.Page_Label__c = carItem.pageLabel;
		   newItem.Page_ID__c = carItem.pageId;
		   newItem.Filter__c = carItem.filter;
           System.debug('newItem=' + JSON.serialize(newItem));
		   upsert newItem;

           return JSON.serialize(newItem);
        }
        catch (Exception e)
        {
            throw new  AuraHandledException(e.getTypeName() + ' - ' + e.getMessage() + ' [Line: ' + e.getLineNumber() + ']');
        }
    }

	public class Carousel 
	{
       public String id = null;
	   public String name;
	   public Integer transitionInterval;
	   public Integer refreshInterval;
	}

	public class CarouselItem 
	{
       public String id = null;
       public String carouselId;
       public Integer order;
       public String dashboardLabel;
	   public String dashboardName;
	   public String pageLabel;
	   public String pageId;
	   public String filter;
	}
}