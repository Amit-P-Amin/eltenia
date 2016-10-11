import PeopleWrapper    from './wrappers/people';
import PersonWrapper    from './wrappers/person';
import ResourcesWrapper from './wrappers/resources';
import FamilyWrapper    from './wrappers/family';
import { Route }        from 'react-router'

export default (Eltenia) => {
	return (
		<Route path="/" component={Eltenia}>
			<Route path="/people"     component={PeopleWrapper}/>
			<Route path="/people/:id" component={PersonWrapper}/>
			<Route path="/resources"  component={ResourcesWrapper}/>
			<Route path="/family/:id" component={FamilyWrapper}/>
		</Route>
	)
}

