/**
 * 
 */
package com.cisco.cmad.event.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cisco.cmad.event.dao.Event;
import com.cisco.cmad.event.dao.EventType;
import com.cisco.cmad.event.dao.EventTypeWithCount;

/**
 * @author sakahuja use JPA instead
 *
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventTypeWithCount(e.type as type, COUNT(e.id) as cnt) FROM Event e GROUP BY e.type")
	List<EventTypeWithCount> getCountGroupByType();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e where e.type = :eventType")
	List<EventType> getEventByType(@Param("eventType") String eventType);
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.id DESC")
	List<EventType> sortByEventIdDesc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.id ASC")
	List<EventType> sortByEventIdAsc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.type DESC")
	List<EventType> sortByEventTypeDesc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.type ASC")
	List<EventType> sortByEventTypeAsc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.message DESC")
	List<EventType> sortByEventMsgDesc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.message ASC")
	List<EventType> sortByEventMsgAsc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.ipaddress DESC")
	List<EventType> sortByEventIPAddressDesc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.ipaddress ASC")
	List<EventType> sortByEventIPAddressAsc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.timestamp DESC")
	List<EventType> sortByEventTimeStampDesc();
	
	@Query("SELECT new com.cisco.cmad.event.dao.EventType(e) FROM Event e ORDER BY e.timestamp ASC")
	List<EventType> sortByEventTimeStampAsc();

}