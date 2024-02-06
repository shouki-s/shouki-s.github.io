import { EntryFieldTypes } from 'contentful'

type SkillSkeleton = {
  contentTypeId: 'skill'
  fields: {
    name: EntryFieldTypes.Text
    genre: EntryFieldTypes.Text
    rate?: EntryFieldTypes.Integer
    monthsOfExperience: EntryFieldTypes.Integer
    comment?: EntryFieldTypes.Text
  }
}

type SkillEntry = Entry<SkillSkeleton, undefined, string>

type WorkSkeleton = {
  contentTypeId: 'work'
  fields: {
    name: EntryFieldTypes.Text
    startDate: EntryFieldTypes.Date
    endDate: EntryFieldTypes.Date
    description?: EntryFieldTypes.Text
    skills: EntryFieldTypes.Array<SkillEntry>
  }
}

type WorkEntry = Entry<WorkSkeleton, undefined, string>
