import _ from 'lodash';
import React,{useState} from 'react'

const ListItems = React.memo(({data,setData,list,selectMultiple = false}) => {

    console.log('listitems rendered ',data);

    const handleToggle = (item) => {

        if(!selectMultiple){
            setData(item.id);
            return;
        }

        if(_.findIndex(data,item) >= 0){

            console.log('for delete');
          const newdata =   _.remove(data,(o)=> {
              return o.id !== item.id;
          });
          console.log('new ddta',newdata);
            setData(newdata);
        }else{
            const newdata = [...data,item];
            setData(newdata);
        }

    }

  return (
    <div>
        {list?.map(item => (
            <div key={item.id} onClick={()=> handleToggle(item)} className="text-left pl-2 flex items-center border-[1px] hover:bg-slate-200 border-b-slate-400">
                <input type="checkbox" className='cursor-pointer ' id={item.id} onChange={() => handleToggle(item)} checked={selectMultiple ? _.findIndex(data,item) >= 0 : item.id === data }  />
                <span className='pl-2 cursor-pointer'>{item.name}</span>
            </div>
        ))}
    </div>
  )
});

export default ListItems