import React from 'react';
import './Programs.css';
import driver_1 from '../../assets/driver1.jpg';
import cargo from '../../assets/cargo.jpeg';
import bus2 from '../../assets/bus2.jpeg';

const Programs = () => {
  return (
    <div className="programs">
      <div className="program">
        <img src={driver_1} alt="" />
        <div className="caption">
          <p>Driver</p>
        </div>
      </div>
      <div className="program">
        <img src={bus2} alt="" />
        <div className="caption">
          <p>Customore</p>
        </div>
      </div>
      <div className="program">
        <img src={cargo} alt="" />
        <div className="caption">
          <p>Cargo</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
