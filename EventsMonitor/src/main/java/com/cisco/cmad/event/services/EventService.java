/**
 * 
 */
package com.cisco.cmad.event.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.dao.EventType;
import com.cisco.cmad.event.dao.EventTypeWithCount;
import com.cisco.cmad.event.enums.EventTypeEnum;

/**
 * @author sakahuja
 *
 */
@Service
public class EventService implements EventServiceIntf {

	@Autowired
	private EventRepository eventRepository;

	@Override
	public void addEvent(Event event) {

		/*
		 * List<School> schoollist = new ArrayList<School>();
		 * 
		 * for(School school: city.getSchools()) { school.setCity(city);
		 * schoollist.add(school); } city.setSchools(new
		 * HashSet<School>(schoollist));
		 */
		eventRepository.save(event);
	}

	@Override
	public List<Event> getEvents(EventTypeEnum eventTypeEnum) {
		List<Event> eventsList = null;
		if (EventTypeEnum.ALL == eventTypeEnum) {
			Iterable<Event> events = eventRepository.findAll();
			eventsList = new ArrayList<Event>();
			for (Event event : events) {
				eventsList.add(event);
			}
		}
		return eventsList;
	}

	@Override
	public Map<String, Long> getEventCountByType() {

		List<EventTypeWithCount> listofEventTypesWithCount = eventRepository
				.getCountGroupByType();

		Map<String, Long> eventCountMapByType = new HashMap<String, Long>();
		for (EventTypeWithCount eventTypeByCount : listofEventTypesWithCount) {
			eventCountMapByType.put(eventTypeByCount.getType(),
					eventTypeByCount.getCnt());
		}

		return eventCountMapByType;
	}

	@Override
	public List<Event> getEventsByType(String eventType) {
		List<EventType> eventsByType = eventRepository
				.getEventByType(eventType);
		List<Event> events = new ArrayList<Event>();
		for (EventType event : eventsByType) {
			events.add(event.getEvent());
		}
		return events;
	}

	@Override
	public List<Event> sortEvents(String sortColumn, String sortByDesc) {
		List<EventType> eventsType = null;
		switch (sortColumn) {
		case "id":
			if (sortByDesc.equalsIgnoreCase("true")) {
				eventsType = eventRepository.sortByEventIdDesc();
			} else {
				eventsType = eventRepository.sortByEventIdAsc();
			}			
			break;
		case "type":
			if (sortByDesc.equalsIgnoreCase("true")) {
				eventsType = eventRepository.sortByEventTypeDesc();
			} else {
				eventsType = eventRepository.sortByEventTypeAsc();
			}			
			break;
		case "message":
			if (sortByDesc.equalsIgnoreCase("true")) {
				eventsType = eventRepository.sortByEventMsgDesc();
			} else {
				eventsType = eventRepository.sortByEventMsgAsc();
			}			
			break;
		case "ipaddress":
			if (sortByDesc.equalsIgnoreCase("true")) {
				eventsType = eventRepository.sortByEventIPAddressDesc();
			} else {
				eventsType = eventRepository.sortByEventIPAddressAsc();
			}			
			break;
		case "timestamp":
			if (sortByDesc.equalsIgnoreCase("true")) {
				eventsType = eventRepository.sortByEventTimeStampDesc();
			} else {
				eventsType = eventRepository.sortByEventTimeStampAsc();
			}			
			break;
		default:
			eventsType = eventRepository.sortByEventIdAsc();
			break;
		}		
		List<Event> events = new ArrayList<Event>();
		for (EventType event : eventsType) {
			events.add(event.getEvent());
		}
		return events;
	}

}