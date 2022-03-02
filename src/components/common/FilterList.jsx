import {useEffect, useState} from 'react'
import ListItems from './ListItems';

const FilterList = ({data,labels,setLabels,selectMultiple}) => {
  const [contactList, setContactList] = useState(data)
  const [filterQuery, setFilterQuery] = useState("")

  console.log('filterlist rendered');

  useEffect(() => {
    if (!filterQuery) {
      setContactList(data);
    } else {
      const queryString = filterQuery.toLowerCase()
      const filteredData = data?.filter(item => {
        const fullName = item.name;
        // if it's just one letter, return all names that start with it
        if (queryString.length === 1) {
          const firstLetter = fullName.charAt(0).toLowerCase()
          return firstLetter === queryString
        }
        else {
          return fullName.toLowerCase().includes(queryString)
        }
      })
      setContactList(filteredData)
    }
  }, [data, filterQuery])

  return (
    <div className={" max-w-60 overflow-auto"}>
      <section>
          <input
            type={"text"}
            placeholder={"search.."}
            onChange={event => setFilterQuery(event.target.value)}
            className={" outline-none p-1 w-full border-b-[1px] border-slate-400"}
          />
      </section>
      <section className={""}>
        {<ListItems data={labels} setData={setLabels} list={contactList} selectMultiple />}
        {contactList && filterQuery.length > 1 && (contactList.length !== 1 || contactList[0].name !== filterQuery) && (
          <div>
              Add
              <span className='font-bold'> "{filterQuery}"</span>
              label
          </div>
        )}
      </section>
    </div>
  )
}

export default FilterList