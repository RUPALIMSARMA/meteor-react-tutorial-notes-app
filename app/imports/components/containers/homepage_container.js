import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Note } from '../../collections/notes'
import { App } from '../app'

export default createContainer(
	() => {
		
		const
			sub = Meteor.subscribe('notes.list')
			,
	    notes = sub.ready()? Note.find({}, { sort: { updatedAt: -1} }).fetch() : []
	    ,
		  handleCreateNote = (title) => {
		    Meteor.call('/note/create', title, (err, result) => {
          if (err) {
            console.log('error: ' + err.reason)
          }
        })
		  }

	  return {
	  	notes,
	  	handleCreateNote,
      placeholder: "New Note..."
	  }
  },
  App
)