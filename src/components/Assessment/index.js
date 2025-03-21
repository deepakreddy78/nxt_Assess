import {component} from 'react'

import QuestionTimer from '../QuestionTimer'

class Assessment extends component {
  render() {
    return (
      <>
        <div>
          <div>
            <QuestionTimer />
          </div>
        </div>
      </>
    )
  }
}

export default Assessment
