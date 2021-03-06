import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './index.scss'
import { repoURL, getRequestParameters, titleDesc } from './constants'
import Table from '../../component/Table'
import { Waypoint } from 'react-waypoint'
import ErrorMessage from '../../component/ErrorMessage'

export const LandingPage = () => {
  const [pageNum, setPageNum] = useState(1)
  const [prevPageNum, setPrevPageNum] = useState(null)
  const [pullReqList, setPullReqList] = useState([])
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [infLoader, setInfLoader] = useState(false)

  const getPullrequestList = () => {
    const reqParams = getRequestParameters()
    const apiURL = `${repoURL}?page=${pageNum}`
    axios
      .get(apiURL, reqParams)
      .then((response) => {
        if (response.status === 200) {
          setPullReqList((prev) => [...prev, ...response.data])
          setLoading(false)
          setInfLoader(false)
          setPrevPageNum(pageNum)
          setPageNum((prev) => prev + 1)
        } else throw new Error('Failed')
      })
      .catch((error) => {
        setFailed(error)
        setLoading(false)
        setInfLoader(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    if (!prevPageNum || prevPageNum !== pageNum) {
      if (pageNum > 1) setInfLoader(true)
      getPullrequestList()
    }
  }

  return (
    <div className="container">
      {loading && !infLoader && (
        <div className="spinner height-60vh padding-top-64">
          <Loader type={'Puff'} height={100} width={100} color="#232F90" />
        </div>
      )}
      {!loading &&
      Array.isArray(pullReqList) &&
      pullReqList.length > 0 ? (
          <div>
            <div className="title">Neovim: GitHub Pull Requests List</div>
            <div className="title-desc">{titleDesc}</div>
            <Table pullRequests={pullReqList} infiniteLoader={infLoader} />
          </div>
        ) : (
          failed && (
            <ErrorMessage />
          )
        )}
      { !loading && <Waypoint onEnter={fetchData} />}
    </div>
  )
}

export default LandingPage
