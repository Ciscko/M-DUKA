import React, { createRef } from 'react';
import ReactPaginate from 'react-paginate'
import 'materialize-css/dist/css/materialize.min.css'
import './tables.css'
import M from 'materialize-css'

class PaginatedTable extends React.Component {
    constructor(props) {
        super(props)
        this.columns = props.columns
        this.cloneData = {...props.data}
        this.data = props.data
        this.state = {
            perPage: 5, sort: true, activeSort: this.columns[0].key, filteredData: [], currentPage: 0, currentPageData: [], data: [], searchVal: ''
        }

        this.selectRef = createRef()
        this.setCurrentPageData = this.setCurrentPageData.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlePageCount = this.handlePageCount.bind(this)
        this.filterRows = this.filterRows.bind(this)
    }
    componentDidMount() {
        M.FormSelect.init(this.selectRef.current)
        this.setState({ ...this.state, filteredData: this.props.data }, () => {
            this.setCurrentPageData()
        })
    }

    

    filterRows(value) {
        if (!value.trim() === '') {
            this.data = this.props.data
        } else {
            this.setState({ ...this.state, searchVal: value.toString().trim().toLowerCase() }, () => {
                let filtered = [...this.data].filter((dataRow) => {
                    if (dataRow[this.state.activeSort].toString().toLowerCase().includes(this.state.searchVal)) {
                        return true
                    } else {
                        return false
                    }
                })
                this.setState({ ...this.state, filteredData: filtered }, () => {
                    this.setCurrentPageData()
                })
            })
        }
    }

    setCurrentPageData() {
        let offset = this.state.currentPage * this.state.perPage
        let filtered = this.state.filteredData
        this.currentPageData = filtered.slice(offset, parseInt(offset) + parseInt(this.state.perPage))
        this.setState({ ...this.state, currentPageData: this.currentPageData })
    }

    sortBy(key) {
        //Sequencial state updates need callback since they are asynchronous.
        this.setState({ ...this.state, sort: !this.state.sort }, () => {
            this.setState({ ...this.state, activeSort: key }, () => {
                this.state.filteredData.sort((a, b) => {
                    if ((a[key] > b[key])) { return this.state.sort ? 1 : -1 }
                    if ((a[key] < b[key])) { return this.state.sort ? -1 : 1 }
                    if ((a[key] === b[key])) { return 0 }
                })
                this.setCurrentPageData()
            })
        })
    }
    handleClick(current) {
        this.setState({ ...this.state, currentPage: current.selected }, () => {
            this.setCurrentPageData()
        })
    }

    handlePageCount(count) {
        this.setState({ ...this.state, perPage: count, currentPage: 0 }, () => {
            this.setCurrentPageData()
        })
    }

    viewSale(id){
        let sale;
        for(let y in this.cloneData){
            if(id === this.props.data[y].id){
                 sale = this.props.data[y]
            }
        }
        this.props.viewSale(sale)
    }

    render() {

        return (
            <div className="section">
                <div className="">
                    <div className="input-field" style={{'paddingLeft': '30px', 'paddingRight': '30px'}}>
                        <label htmlFor="filter" style={{'paddingLeft': '30px', 'paddingRight': '30px'}}>Search...</label>
                        <input onChange={(e) => this.filterRows(e.target.value)} name="filter" value={this.state.searchVal} type="text" id="filter" />
                    </div>
                </div>

                {
                    (this.data.length > 0) ?
                        <>
                            <table className="responsive-table highlight centered">
                                <thead>
                                    <tr>
                                        {
                                            this.columns.map((header, index) => {
                                                return (
                                                    <th onClick={() => this.sortBy(header.key)} key={index}>
                                                        {header.value}
                                                        <span>
                                                            {this.state.activeSort === header.key ?
                                                                <i className="material-icons right">{this.state.sort ? 'arrow_drop_down' : 'arrow_drop_up'}</i>
                                                                :
                                                                <i className="material-icons right">list</i>
                                                            }
                                                        </span>
                                                    </th>
                                                )
                                            })
                                        }
                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.currentPageData.map((row, index) => {
                                            
                                            return (
                                                <tr key={index}>
                                                    {
                                                        
                                                        Object.values(row).map((cellvalue, index) => {
                                                            if(!Array.isArray(cellvalue)){
                                                                return (
                                                                    <td key={index}>
                                                                        {cellvalue}
                                                                    </td>
                                                                )
                                                            } 
                                                        })
                                                    }
                                                    <td>
                                                        <a onClick={() => this.viewSale(Object.values(row)[0]) } className="btn green"><i className="material-icons">remove_red_eye</i></a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="input-field col l2 m2 s12 center">
                                    <select className="browser-default" value={this.state.perPage} ref={this.selectRef} name="pageno" onChange={(e) => this.handlePageCount(e.target.value)}>
                                        {
                                            [5, 10, 20, 30, 50, 100, this.data.length].map((amt, index) => {
                                                return (
                                                    <option key={index} value={amt}>{amt}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col l10 m10 s12">
                                    <ReactPaginate
                                        pageCount={Math.ceil(this.data.length / this.state.perPage)}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={2}
                                        previousLabel="Previous"
                                        nextLabel="Next"
                                        nextClassName="waves-effect labelnp"
                                        previousClassName="waves-effect labelnp"
                                        breakLabel="..."
                                        onPageChange={(current => this.handleClick(current))}
                                        initialPage={this.state.currentPage}
                                        containerClassName="pagination center"
                                        pageClassName="waves-effect"
                                        activeClassName="active"
                                        disabledClassName="disabled"
                                    />
                                </div>
                            </div>
                        </>
                        :
                        <div className="center container">
                            <p>No data available!</p>
                        </div>
                }
            </div>
        );
    }
}
export default PaginatedTable;