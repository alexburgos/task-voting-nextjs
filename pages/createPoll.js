import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { StyledContainer } from '../styles/StyledContainer';
import {
	StyledForm,
	StyledSubmit,
	StyledInput,
	StyledTextArea
} from '../styles/StyledForm';
import { withAuthSync } from '../utils/login';

const CreatePoll = () => {
	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const router = useRouter();

	async function createPoll(e) {
		e.preventDefault();
		try {
			await fetch('/api/createPoll', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ taskName, taskDescription })
			});
			router.push('/polls');
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Layout>
			<StyledContainer
				display="flex"
				flexDirection="column"
				alignItems="center"
				flex="1"
			>
				<h1> Create New Poll: </h1>{' '}
				<StyledForm onSubmit={createPoll}>
					<StyledInput
						type="text"
						name="taskName"
						placeholder="Enter a task name"
						value={taskName}
						onChange={e => setTaskName(e.target.value)}
						required
					/>
					<StyledTextArea
						name="taskDescription"
						placeholder="What is this task supposed to?"
						value={taskDescription}
						onChange={e => setTaskDescription(e.target.value)}
					/>
					<StyledSubmit type="submit" value="Create Poll" />
				</StyledForm>{' '}
			</StyledContainer>{' '}
		</Layout>
	);
};

export default withAuthSync(CreatePoll);
