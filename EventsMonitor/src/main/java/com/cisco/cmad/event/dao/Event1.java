/**
 * 
 */
package com.cisco.cmad.event.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author sakahuja
 *
 */
@Entity
@Table(name = "Event")
public class Event1 {

	@Id
	private int id;
	private String eventDesc;
	private String severity;
	private String ipAddress;
	private String deviceName;

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getDeviceName() {
		return deviceName;
	}

	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public String getSeverity() {
		return severity;
	}

	public void setSeverity(String severity) {
		this.severity = severity;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", eventDesc=" + eventDesc + ", severity="
				+ severity + ", ipAddress=" + ipAddress + ", deviceName="
				+ deviceName + "]";
	}

}
