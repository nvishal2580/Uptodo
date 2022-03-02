import React,{useState} from 'react'

const ListItems = React.memo(({data,setData,list,selectMultiple = false}) => {

    console.log('listitems rendered');

    const handleToggle = (id) => {

        if(!selectMultiple){
           if(data.count>0 && data.list[id] !== true) return;
        }
        

        let local = Object.assign({},data.list);
        local[id] = !local[id];
        setData({list:local,count: data.list[id] === true ? data.count-1 : data.count+1});
    }

  return (
    <div>
        {list?.map(item => (
            <div key={item.id} onClick={()=> handleToggle(item.id)} className="text-left pl-2 align-middle border-[1px] hover:bg-slate-200 border-b-slate-400">
                <input type="checkbox" className='cursor-pointer ' id={item.id} onChange={() => handleToggle(item.id)} checked={data.list[item.id] === true}  />
                <span className='pl-2'>{item.name}</span>
            </div>
        ))}
    </div>
  )
});

export default ListItems