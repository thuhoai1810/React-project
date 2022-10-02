import React from "react";
import { useState, useEffect } from "react";

function App() {
	const [job, setJob] = useState<string>("");
	const [jobs, setJobs] = useState<string[]>(() => {
		const storageJob = JSON.parse(localStorage.getItem("jobs") ?? "[]");
		console.log(storageJob);
		return storageJob;
	});
	useEffect(() => {
		fetch("https://62e897e393938a545be80ba5.mockapi.io/");
	}, []);
	const handleSubmit = () => {
		setJobs((prev) => {
			const newJobs = [...prev, job];

			// save to local storage
			const jsonJobs = JSON.stringify(newJobs);
			localStorage.setItem("job", jsonJobs);

			return newJobs;
		});
		setJob("");
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<div className='Submit'>
					<input value={job} onChange={(e) => setJob(e.target.value)} />
					<button onClick={handleSubmit}>add</button>
					<ul>
						{jobs.map((job, index) => (
							<li key={index}>{job}</li>
						))}
					</ul>
				</div>
			</header>
		</div>
	);
}

export default App;
