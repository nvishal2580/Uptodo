import React, {useEffect, useState} from 'react'
import ListItems from './ListItems';

const FilterList = React.memo(({data,labels,setLabels,selectMultiple,handleAddLabel,extraAdd}) => {
  const [contactList, setContactList] = useState([])
  const [filterQuery, setFilterQuery] = useState("")

  console.log('filterlist rendered',contactList,data);

  useEffect(() => {
    if (filterQuery.length === 0) {
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
  }, [data,filterQuery])

  useEffect(() => {
      if(data == null){
        setContactList([]);
      }
      else {
        setContactList(data);
      }
  }, [data])

  return (
    <div className={" max-w-60 overflow-auto"}>
      <section>
          <input
            type={"text"}
            placeholder={"search.."}
            onChange={event => setFilterQuery(event.target.value)}
            className={" outline-none p-1 w-full border-b-[1px] border-slate-400"}
            maxLength={12}
          />
      </section>
      <section >
        {<ListItems data={labels} setData={setLabels} list={contactList} selectMultiple={selectMultiple} />}
        {extraAdd  && filterQuery.length > 1 &&  (
          <div className='flex hover:bg-gray-200'>
            <button onClick={() => handleAddLabel(filterQuery)} className='ml-2  max-w-[200px] overflow-hidden'>
              Add
              <span className='font-bold'> "{filterQuery}"</span>
              label
          </button>
          </div>
        )}
      </section>
    </div>
  )
})

export default FilterList