interface User {
  id: string,
  name: string,
  age: number,
  email: string,
  password: string  
}

type UpdateProps = Pick<User, 'name' |'age' | 'email'>
//we can use the above to Pick the necessary props from the source of truth
//and we can use them as shown below as instead of selecting only the required props
//each time and setting them in the parameters below

type UpdatePropsOptional = Partial<UpdateProps>;

const updateUser = (updatedProps: UpdateProps) => {
  //hit the db to update the user
}

type myUser = {
  readonly name: string;
  readonly age: number;
}

interface Config{
  endpoint: string;
  apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: "api.example.com",
  apiKey: "21312312",
};

//now using readonly even arrays and objects can't be changed later on


//uglier syntax used below before the intro of records
// interface UserEntry {
//   id: string;
//   name: string;
// }

// type Users = { [key: string]: UserEntry };

// const users: Users = {
//   'abc123': { id: "abc123", name: "John Doe" },
//   'xyz789': { id: "xyz789", name: "Jane Doe" },
// };

interface UserEntry {
  id: string;
  name: string;
}

type Users = Record<string, UserEntry>;

const users: Users = {
  'abc123': { id: "abc123", name: "John Doe" },
  'xyz789': { id: "xyz789", name: "Jane Doe" },
};

// Maps -> fancier way to deal with objects similar to cpp

interface UserData {
  id: string;
  name: string;
}

// Initialize an empty Map
const usersMap = new Map<string, UserData>(); //here we are mentioning that the map will have string as key and UserData as the value

// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }


// Exclude -> In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.

type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK