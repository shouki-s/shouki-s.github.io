import type { EntryFieldTypes } from 'contentful'

type SkillSkeleton = {
  contentTypeId: 'skill'
  fields: {
    name: EntryFieldTypes.Text
    genre: EntryFieldTypes.Text
    rate?: EntryFieldTypes.Integer
    monthsOfExperience: EntryFieldTypes.Integer
    comment?: EntryFieldTypes.Text
    showInSkillList: EntryFieldTypes.Boolean
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

type ProductSkeleton = {
  contentTypeId: 'product'
  fields: {
    name: EntryFieldTypes.Text
    url?: EntryFieldTypes.Text
    image?: EntryFieldTypes.AssetLink
    releaseDate?: EntryFieldTypes.Date
    description?: EntryFieldTypes.Text
    skills?: EntryFieldTypes.Array<SkillEntry>
  }
}

type ProductEntry = Entry<ProductSkeleton, undefined, string>
