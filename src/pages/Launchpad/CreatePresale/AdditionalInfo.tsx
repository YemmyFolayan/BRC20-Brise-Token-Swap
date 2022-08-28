/* eslint-disable */
import React from 'react'
import { Input, CardBody } from '@evofinance9/uikit'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'

import '@djthoms/pretty-checkbox'

interface FormComponentProps {
  handleChange: (params: any) => any
  data: {
    logo_link: string
    website_link: string
    github_link: string
    twitter_link: string
    reddit_link: string
    telegram_link: string
    project_dec: string
    certik_audit: boolean
    doxxed_team: boolean
    utility: boolean
    kyc: boolean
  }
}

export default function AdditionalInfo({ handleChange, data }: FormComponentProps) {
  const checkbox = useCheckboxState({ state: [] })

  const {
    logo_link,
    website_link,
    github_link,
    twitter_link,
    reddit_link,
    telegram_link,
    project_dec,
    certik_audit,
    doxxed_team,
    utility,
    kyc,
  } = data

  return (
    <CardBody>
      <div className="mb-3">
        <Input
          placeholder="Logo Link (URL must end with a supported image extension png, jpg, jpeg or gif)"
          className="mt-3"
          scale="lg"
          value={logo_link}
          onChange={handleChange('logo_link')}
        />
      </div>

      <div className="mb-3">
        <Input
          placeholder="Website Link"
          className="mt-3"
          scale="lg"
          value={website_link}
          onChange={handleChange('website_link')}
        />
      </div>

      <div className="mb-3">
        <Input
          placeholder="GitHub Link"
          className="mt-3"
          scale="lg"
          value={github_link}
          onChange={handleChange('github_link')}
        />
      </div>

      <div className="mb-3">
        <Input
          placeholder="Twitter Link"
          className="mt-3"
          scale="lg"
          value={twitter_link}
          onChange={handleChange('twitter_link')}
        />
      </div>
      <div className="mb-3">
        <Input
          placeholder="Reddit Link"
          className="mt-3"
          scale="lg"
          value={reddit_link}
          onChange={handleChange('reddit_link')}
        />
      </div>
      <div className="mb-3">
        <Input
          placeholder="Telegram Link"
          className="mt-3"
          scale="lg"
          value={telegram_link}
          onChange={handleChange('telegram_link')}
        />
      </div>
      <div className="mb-3">
        <Input
          placeholder="Project Description"
          className="mt-3"
          scale="lg"
          value={project_dec}
          onChange={handleChange('project_dec')}
        />
      </div>

      {/* <div className="row">
        <div className="col-md-6 mb-3">
          {checkbox.state}
          <Checkbox
            checked={certik_audit}
            onChange={handleChange('certik_audit')}
            color="warning"
            bigger
            shape="curve"
            animation="jelly"
            icon={<i className="fas fa-check" />}
          >
            Certik audit
          </Checkbox>
        </div>
        <div className="col-md-6 mb-3">
          <Checkbox
            checked={doxxed_team}
            onChange={handleChange('doxxed_team')}
            color="warning"
            bigger
            shape="curve"
            animation="jelly"
            icon={<i className="fas fa-check" />}
          >
            Doxxed team
          </Checkbox>
        </div>
        <div className="col-md-6 mb-3">
          <Checkbox
            checked={utility}
            onChange={handleChange('utility')}
            color="warning"
            bigger
            shape="curve"
            animation="jelly"
            icon={<i className="fas fa-check" />}
          >
            Utility information
          </Checkbox>
        </div>
        <div className="col-md-6 mb-3">
          <Checkbox
            checked={kyc}
            onChange={handleChange('kyc')}
            color="warning"
            bigger
            shape="curve"
            animation="jelly"
            icon={<i className="fas fa-check" />}
          >
            KYC
          </Checkbox>
        </div>
      </div> */}
    </CardBody>
  )
}
