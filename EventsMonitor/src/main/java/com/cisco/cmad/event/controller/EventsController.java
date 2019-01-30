/**
 * 
 */
package com.cisco.cmad.event.controller;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.enums.EventTypeEnum;
import com.cisco.cmad.event.services.EventService;

/**
 * @author sakahuja
 *
 */
@RestController
@ComponentScan(basePackages = { "com.cisco.cmad.event.services" })
public class EventsController {

	Logger logger = LoggerFactory.getLogger(EventsController.class);

	@Autowired
	EventService eventService;

	@RequestMapping("/events")
	public ResponseEntity<List<Event>> getEvents(
			@RequestParam("sort") String sortColumnValue,
			@RequestParam("desc") String descValue) {
				
		List<Event> events = null;
		if (sortColumnValue != null && sortColumnValue.equalsIgnoreCase("NA")) {
			events = eventService.getEvents(EventTypeEnum.ALL);
		} else if (sortColumnValue != null
				&& !sortColumnValue.equalsIgnoreCase("NA")) {
			events = eventService.sortEvents(sortColumnValue, descValue);
		} else {
			events = eventService.getEvents(EventTypeEnum.ALL);
		}

		return ResponseEntity.status(HttpStatus.OK).body(events);
	}

	@RequestMapping("/countbytype")
	public ResponseEntity<Collection> getEventCountByType() {

		Map<String, Long> eventCountByType = eventService.getEventCountByType();
		return ResponseEntity.status(HttpStatus.OK).body(
				eventCountByType.entrySet());

	}

	@RequestMapping(value = "/type/{eventType}/events", method = RequestMethod.GET)
	public ResponseEntity<List<Event>> getEventsByType(
			@PathVariable("eventType") String eventType,
			UriComponentsBuilder builder) {
		return ResponseEntity.status(HttpStatus.OK).body(
				eventService.getEventsByType(eventType));
	}

}
