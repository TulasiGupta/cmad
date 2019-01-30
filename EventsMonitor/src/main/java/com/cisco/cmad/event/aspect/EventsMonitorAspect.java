package com.cisco.cmad.event.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.cisco.cmad.event.enums.EventTypeEnum;

/**
 * 
 */

/**
 * @author tcheedel
 *
 */
@Aspect
@Component
public class EventsMonitorAspect {
	
	EventsMonitorAspect() {
		System.out.println("in EventsMonitorAspect");
	}
	
	//@Around("sampleMethodPointcut()")
	public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
		System.out.println("in aspect..."+joinPoint.toString());
		return joinPoint.proceed();
	}
	
	//@Pointcut("execution(* com.cisco.cmad.event.services.EventService.getEvents(..))")
	public void sampleMethodPointcut() {
		
	}
}
