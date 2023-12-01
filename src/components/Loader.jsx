import React from "react";

function Loader() {
	return (
		<div className='border-[2px] p-5 rounded-xl max-w-7xl mx-auto flex flex-col justify-center items-center w-full bg-white'>
			<div className='relative flex justify-center items-center'>
				<div className='absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500'></div>
				<img src='https://www.svgrepo.com/show/509001/avatar-thinking-9.svg' className='rounded-full h-28 w-28' />
			</div>
		</div>
	);
}

export default Loader;
