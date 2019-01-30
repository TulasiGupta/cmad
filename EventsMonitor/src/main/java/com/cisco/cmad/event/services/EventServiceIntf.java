package com.cisco.cmad.event.services;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.Query;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.enums.EventTypeEnum;


public interface EventServiceIntf {
	
	public void addEvent(Event event);

    List<Event> getEvents(EventTypeEnum eventTypeEnum);
    
    Map<String, Long> getEventCountByType();
    
    List<Event> getEventsByType(String eventType);
    
    List<Event> sortEvents(String sortColumn, String sortByDesc);
    
}
