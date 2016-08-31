import React, { PropTypes } from 'react'

// import { updateUser } from '../user.module'
import Section from '../../../components/Section'
import TextInput from '../../../components/TextInput'
// import LastName from './LastName'
// import Title from './Title'
// import PhoneNumber from './PhoneNumber'

function AboutYouSection({ aboutYou, errors, onChange, onBlur }) {
  return (
    <Section id="about-you-section" title="About You">
      <div className="row">
        <div className="col-xs-6">
          <TextInput
            name="firstName"
            placeholder="First Name"
            value={aboutYou.firstName}
            error={errors.firstName}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <div className="col-xs-6">
          <TextInput
            name="lastName"
            placeholder="Last Name"
            value={aboutYou.lastName}
            error={errors.lastName}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
    </Section>
  )
}

AboutYouSection.propTypes = {
  aboutYou: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

AboutYouSection.defaultProps = {
  errors: {},
  onBlur: () => {},
}

export default AboutYouSection
