import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DotsHorizontal from '../../assets/icons/DotsHorizontal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropdownMenu({handleSubmit,ItemList,columnId,task={}}) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" ">
          <DotsHorizontal aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2  w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {ItemList?.map((item) => (
              <Menu.Item key={item.id} >
              {({ active }) => (
                <button
                  onClick={() => handleSubmit({...item,columnId:columnId,taskId:task.id})}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full'
                  )}
                >
                  {item.name}
                </button>
              )}
            </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}