import { EntryFieldTypes } from 'contentful'

type SkillSkeleton = {
  contentTypeId: 'skill'
  fields: {
    name: EntryFieldTypes.Text
    genre: EntryFieldTypes.Text
    rate: EntryFieldTypes.Integer
    monthsOfExperience: EntryFieldTypes.Integer
    comment: EntryFieldTypes.Text
  }
}
