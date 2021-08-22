import * as React from 'react'
import '../Table/index.scss'

export const TableBody = (props) => {
  const { data } = props

  const handleOnClickRoute = (url) => window.open(url, '_blank')

  return (
    <tbody>
      {Array.isArray(data) &&
        data.map((row) => {
          const {
            id,
            title,
            user: { login: author },
            base: { label: baseBranch },
            head: { label: authorBranch },
            requested_reviewers,
            created_at,
            labels,
            html_url,
          } = row
          return (
            <tr
              key={id}
              onClick={() => handleOnClickRoute(html_url)}
              className="table-row"
            >
              <td className="text-transform-capitalize">
                {title}
              </td>
              <td className="text-align-center">{baseBranch}</td>
              <td>{authorBranch}</td>
              <td className="text-align-center text-transform-uppercase">
                {author}
              </td>
              <td>{created_at}</td>
              <td className="text-align-center text-transform-uppercase">
                {requested_reviewers
                  .map((reviewer) => reviewer.login)
                  .join(', ')}
              </td>
              <td className="text-transform-capitalize">
                {labels.map((label) => label.name).join(', ')}
              </td>
            </tr>
          )
        })}
    </tbody>
  )
}

export default TableBody
