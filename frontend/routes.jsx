import PersonWrapper   from './wrappers/person';
import FarmlandWrapper from './wrappers/farmland';
import FamilyWrapper   from './wrappers/family';
import { Route }       from 'react-router'

export default (Eltenia) => {
	return (
		<Route path="/" component={Eltenia}>
			<Route path="/person/:id" component={PersonWrapper}/>
			<Route path="/resource/farmland" component={FarmlandWrapper}/>
			<Route path="/family/:id" component={FamilyWrapper}/>
		</Route>
	)
}

