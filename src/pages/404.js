import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content-404">
                <h1>404</h1>
                <h2>¿Estás perdido?</h2>
                <Link to="/">Regresa al inicio</Link>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
