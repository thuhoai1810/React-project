import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

interface Todos {
	id: string;
	todo: string;
}
interface Image extends File {
	preview?: string;
}

//
function TodoForm() {
	const [job, setJob] = useState<string>("");
	const [jobs, setJobs] = useState<Todos[]>(() => {
		const storageJob = JSON.parse(localStorage.getItem("jobs") ?? "[]");
		console.log(storageJob);
		return storageJob;
	});
	const [image, setImage] = useState<Image>();

	// Hook
	useEffect(() => {
		fetch(`https://62e897e393938a545be80ba5.mockapi.io/Todos/${job}`).then(
			(res) =>
				res.json().then((jobs) => {
					// console.log(jobs);
					setJobs(jobs);
				})
		);
	}, []);

	useEffect(() => {
		return () => {
			if (image?.preview) {
				return image && URL.revokeObjectURL(image.preview);
			}
		};
	}, [image]);

	// handle
	const handleSubmit = () => {
		setJobs(() => {
			const newJob = {
				id: nanoid(),
				todo: job,
			};
			const newJobs = [...jobs, newJob];

			// save to local storage
			const jsonJobs = JSON.stringify(newJobs);
			localStorage.setItem("job", jsonJobs);

			return newJobs;
		});
		setJob("");
	};

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file: Image = e.target.files[0];
			file.preview = URL.createObjectURL(file);
			setImage(file);
			// console.log(file);
		}
	};
	return (
		<div className='todo-form'>
			<div className='todo-btn-input '>
				<input
					className='todo-input '
					value={job}
					onChange={(e) => setJob(e.target.value)}
				/>
				<button className='todo-button' onClick={handleSubmit}>
					add
				</button>
			</div>
			<div>
				<input type='file' className='' onChange={handleImage} />
				{image && (
					<img src={image.preview} alt='' className='todo-input' width='80%' />
				)}
			</div>
			<ul className='complete'>
				{jobs.map((newJob) => {
					// console.log(newJob);
					return <li key={newJob.id}>{newJob.todo}</li>;
				})}
			</ul>
		</div>
	);
}
export default TodoForm;
