import React from 'react';
import { timelineEvents } from '../data/timeline';
import TimelineCard from './TimelineCard';
import SnakePath from './SnakePath';
import './TimelineCard.css';

export default function Timeline({ parallaxRef }) {
  return (
    <div className="content-wrapper">
      <div className="timeline" id="timeline">
        <SnakePath count={timelineEvents.length} parallaxRef={parallaxRef} />
        
        {timelineEvents.map((event) => (
          <TimelineCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
