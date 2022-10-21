import { Button, Container, Form } from "react-bootstrap"
const FriendsSearchBar = ({ allUsers, setUsers }) => {

    // const [_products, _setProducts] = useState(products);
    const handleSearch = (e) => {
        const search = e.target.value;
        const filteredUsers = allUsers.filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase());
        });
        setUsers(filteredUsers);
        // setProducts(products);
    };


    return (
        <Container>

            <Form className="d-flex my-2">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearch}
                />
                {/* <Button variant="outline-success" >Search</Button> */}
            </Form>
        </Container>
    )
}




export default FriendsSearchBar