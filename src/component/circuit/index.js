import React, { useEffect } from 'react';
import ImgCircuit from '../../assets/img/circuit-mandalika.png';
import PathCircuit from '../layout/pathCircuitMandalika';
import anime from 'animejs';
import '../../assets/style/circuit.scss';

const Circuit = () => {
	useEffect(() => {
		var path = anime.path('#circuit path'),
			lapCounts = [0, 0, 0],
			durations = [28100, 27400, 29000, 30100, 35000, 40000];

		function startCarAnimation(target, index, duration) {
			anime({
				targets: target,
				translateX: path('x'),
				translateY: path('y'),
				rotate: path('angle'),
				easing: 'linear',
				duration: duration,
				complete: function (anim) {
					lapCounts[index]++;
					startCarAnimation(target, index, duration);
				}
			});
		}

		var cars = document.getElementsByClassName('car');
		for (var i = 0; i < cars.length; i++) {
			startCarAnimation(cars[i], i, durations[i]);
		}
	}, []);

	return (
		<div className='mandalika'>
			<div className="circuit-mdlk">
				<img src={ImgCircuit} alt="Circuit Mandalika" />
			</div>
			<div className="cars">
				<div className="car" id="car-1">LH</div>
				<div className="car" id="car-2">VB</div>
				<div className="car" id="car-3">DR</div>
				<div className="car" id="car-4">DR</div>
				<div className="car" id="car-5">DR</div>
				<div className="car current" id="car-6">YOU</div>
			</div>
			<PathCircuit />
		</div>
	);
}
export default Circuit;
