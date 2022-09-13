

const items = [
  { name: 'Все', id: 0 },
  { name: 'Мясные', id: 1 },
  { name: 'Вегетарианская', id: 2 },
  { name: 'Гриль', id: 3 },
  { name: 'Острые', id: 4 },
  { name: 'Закрытые', id: 5 },
];

function Categories({ value, onChangeSort }) {
  return (
    <div className='categories'>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.id}
            onClick={() => onChangeSort(index)}
            className={value === index ? 'active' : ''}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
