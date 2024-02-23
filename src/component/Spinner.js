import React from 'react'
import loading from './loading.gif'

// export default class Spinner extends Component {
// render() {
// the above commented part is the class based component to use this component we have to import the "import React {component} from 'react'"insted of "import React from 'react'"

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} alt="loading" />
    </div>
  )
}
// }
export default Spinner