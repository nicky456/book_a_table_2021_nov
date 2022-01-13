const Counter = ({getCount}) => {

  let [count, setCount] = React.useState(0)

  const increment = () => {
    setCount(count += 1)
    getCount(count)
  }
  const decrement = () => setCount(count -= 1)

  return (
    <div className="person-box">
      <button onClick={decrement}>-</button>
      <input type="text" value={count} pattern="[0-20]" onChange={() => {}}></input>
      <button onClick={increment}>+</button>
    </div>
  )
}


const App = () => {
  const pizzaList = [
    {id: 1, name: "bbq", topping: "tomato-sauce, barbecue-sauce, bacon, chicken, onion, californian paprika, mozzarella", price: 2500},
    {id: 2, name: "songoku", topping: "tomato-sauce, ham, mushroom, corn, mozzarella", price: 2200},
    {id: 3, name: "margherita", topping: "tomato-sauce, mozzarella", price: 2100},
    {id: 4, name: "hawaii", topping: "tomato-sauce, ham, pineapple, mozzarella", price: 2200},
    {id: 5, name: "hungarian", topping: "tomato-sauce, pepperoni, beef, jalapeno, green pepper, tomato, purple onion, mozzarella", price: 2500},
    {id: 6, name: "dallas", topping: "tomato-sauce, ham, mushroom, mozzarella", price: 2200},
    {id: 7, name: "farmer", topping: "tomato-sauce, chicken, bell pepper, red onion, mushroom, mozzarella", price: 2300},
    {id: 8, name: "megavega", topping: "tomato-sauce, mushroom, spinach, colorful bell pepper, cherry tomato, red onion, coreggio cheese, mozzarella balls, mozzarella", price: 2200},
  ];

  //Time select
  const availableTimes = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30","16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",];

  let selectedTime = ""

  let selectTime = (time) => {
      selectedTime = time;
  }

  //Date select
  let selectedDate = ""
  let selectDate = (date) => {
      selectedDate = date;
  }

  const [showPopup, setShowPopup] = React.useState(false)

  function togglePopup(){
    setShowPopup(!showPopup)
    setShowConfirmation(false)
  }
  
 
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
  let yyyy = today.getFullYear();
  let hh = today.getHours()+1;
  let min = today.getMinutes();

  function dateCorrection(dd,mm,yyyy,hh,min){
    if(dd<10) dd='0'+dd
    if(mm<10) mm='0'+mm
    if(hh<10) hh='0'+hh
    if(min<10) min='0'+min
    today = yyyy+'-'+mm+'-'+dd
  }
  dateCorrection(dd,mm,yyyy,hh,min);
  
  let guestName = ""
  let guestEmail = ""
  let guestCount = 0

  const getCountOutside = (count) => {
    guestCount = count
  }

  function sendRequest(guestName,guestEmail,guestCount,selectedDate,selectedTime){
    setShowConfirmation(true)
    console.log("Guestname: " + guestName)
    console.log("Email: " + guestEmail)
    console.log("Guest numbers: " + guestCount)
    console.log("Selected date: " + selectedDate)
    console.log("Selected time: " + selectedTime)
  }
  
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  

  return (
      <div id="app-container"> 
      {showPopup && showConfirmation === false ? <div className="popup"> 
       
        <div className="popup-header">
          <h2>Book a table</h2>
          <button className="close-popup" onClick={togglePopup}>X</button>
        </div>
        <div className="form">
          <div className="left popup-side">
            <label>Name</label>
            <input type="text" onChange={e => guestName = e.target.value} required></input>
            <label>Email address</label>
            <input type="email" onChange={e => guestEmail = e.target.value} required></input>
            <label>Number of person</label>

            <Counter getCount={getCountOutside}/>

          </div>
          <div className="right popup-side">
            <div className= "date-picker">
              <input type="date" min={today} onChange={e => selectDate(e.target.value)}></input>
            </div>
            <div className="time-picker">
              {availableTimes.map(time => 
                <button key={time} className="time" onClick={() => selectTime(time)}>{time}</button>
              )}
            </div>
          </div>
        </div>
        <button className="submit-btn" onClick={() => sendRequest(guestName,guestEmail,guestCount,selectedDate,selectedTime)}>Submit</button>

      </div> 
      : 
        (showPopup && showConfirmation && <div className="popup">
          <div className="popup-header">
            <h2>Book a table</h2>
            <button className="close-popup" onClick={togglePopup}>X</button>
          </div>
          <div className="conf-message-box">
            <h3>Thank you for reservation</h3>
          </div>
          <div></div>
        </div>)}
      
        <header className="section-header">
          <div className="logo-box"><img src="./img/logo.svg"></img></div>
          <button className="btn-book" onClick={togglePopup}>Book a Table</button>
        </header>
        <section className="section-welcome">
          <div className="section-welcome-box">
            <h1 className="h1-welcome">Welcome to our Spicy Pizza Place</h1>
            <div className="welcome-container">
              <div className="welcome-box">
                <h2 className="h2-welcome">Our Story</h2>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error deleniti, ipsa corporis illo temporibus id ex placeat alias atque rem praesentium nesciunt dignissimos fuga libero. Sapiente dolores est aspernatur quo.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam totam mollitia consequuntur doloremque consequatur eum quas accusamus quibusdam sunt eaque praesentium, voluptatum, similique dolorem quo veniam nobis optio. Aliquid, laudantium?
                </p>
              </div>
              <div className="menu-box">
                {pizzaList.map(pizza =>
                <div className="pizza-box" key={pizza.id}>
                  <div className="pizza-name">{pizza.id + ". " + pizza.name.toUpperCase()}</div>
                  <div className="pizza-topping">{"- " + pizza.topping}</div>
                  <div className="pizza-price">{"Price: " + pizza.price + ".- Ft"}</div>
                </div> 
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="section-booking">

        </section>
      </div>
  )
}