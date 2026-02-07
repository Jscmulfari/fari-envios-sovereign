import {Composition} from 'remotion';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const FariIdentity = () => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const opacity = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{backgroundColor: '#007aff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
			<div style={{opacity, fontSize: 80, fontWeight: 'bold', textAlign: 'center'}}>
				FARI ENVÍOS<br/>
				<span style={{fontSize: 30, opacity: 0.7}}>TU ESFUERZO LLEGA A CASA</span>
			</div>
		</AbsoluteFill>
	);
};

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="FariHero"
				component={FariIdentity}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
