pragma experimental ABIEncoderV2;
pragma solidity ^ 0.4.25;

contract DonationToOrganization {
    uint public totalContributors; 
    mapping(address=>bool) available_address;
    struct Request {
        string org_name;
        address  org_address;
        string cause_name;
        string description;
        uint amount;
        uint amount_collected;
        uint numberOfVoters;
        uint256 timestamp;
        string status;
        mapping(address=>bool) voters;
    }

    Request [] public requests;

    // struct NGO_Info {

    // }

    // struct Donor_Info {
    //     string donor_name;
    //     address donor_wallet_address;
    //     string id;
    // }

    // Donor_Info [] donors;

    struct Histroy {
        string org_name;
        string cause_name;
        address donor_address;
        uint amount;
    }

    Histroy [] public histroy;

    function createNewRequest(string memory _org_name,address _org_address ,string memory _cause_name,string memory _description,uint _amount) public {
        require(_org_address == msg.sender,"You cant create a new request as you are not the part of the organization");
         Request memory newRequest = Request(
            {
                org_name:_org_name,
                org_address:_org_address,
                cause_name:_cause_name,
                description:_description, //estimate to server 100 person each with 1 ether
                amount:_amount,
                amount_collected:0,
                numberOfVoters:0,
                timestamp:block.timestamp,
                status:"pending/approved/rejected" 
            }
            );
         requests.push(newRequest);
    }

    function voteForRequest(uint index) public {
        Request storage thisRequest = requests[index];
        require(thisRequest.voters[msg.sender] == false,"You have already done with voting");
        thisRequest.voters[msg.sender] = true;
        thisRequest.numberOfVoters++;
    }

    function donate(string memory _org_name,string memory _cause_name) public payable{
        for(uint i=0;i<requests.length;i++){
            if(compareStrings(requests[i].org_name,_org_name) && compareStrings(requests[i].cause_name,_cause_name)){
                require(requests[i].amount > requests[i].amount_collected,"Required Fund has been collected already");
                //  require(requests[i].numberOfVoters > totalContributors / 2,"The project you are trying to donate is not yet approved");
                requests[i].amount_collected += msg.value/1000000000000000000;
            Histroy memory newHis = Histroy({
                org_name: _org_name,
                cause_name: _cause_name,
                donor_address: msg.sender,
                amount: msg.value
            });

            histroy.push(newHis);
                
            }
            //  require(requests[i].numberOfVoters > totalContributors / 2,"");
        }
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getAllTransactions() public view returns (Histroy [] memory) {
        return histroy;
    }

}