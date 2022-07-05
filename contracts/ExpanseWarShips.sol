// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

import "./libraries/Base64.sol";

contract ExpanseWarShips is ERC721 {

  struct ShipAttributes {
    uint shipIndex;
    string name;
    string imageURI;
    uint hp;
    uint maxHp;
    uint attackDamage;
  }
  
  struct AlienBoss {
    string name;
    string imageURI;
    uint hp;
    uint maxHp;
    uint attackDamage;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
  ShipAttributes[] defaultShips;
  AlienBoss public alienBoss;
  
  mapping(uint256 => ShipAttributes) public nftHolderAttributes;
  
  mapping(address => uint256) public nftHolders;
  
  constructor(
    string[] memory shipNames,
    string[] memory shipImageURIs,
    uint[] memory shipHp,
    uint[] memory shipAttackDmg,
    string memory bossName,
    string memory bossImageURI,
    uint bossHp,
    uint bossAttackDmg
  )
    ERC721("Warships", "WAR")
  {
    console.log("This is my first NFT game!");
    
    alienBoss = AlienBoss({
      name: bossName,
      imageURI: bossImageURI,
      hp: bossHp,
      maxHp: bossHp,
      attackDamage: bossAttackDmg
    });
    
    console.log("[+] Created a Alien Boss %s w/ HP: %s, Img: %s", alienBoss.name, alienBoss.hp, alienBoss.imageURI);
    
    for (uint i = 0; i < shipNames.length; i += 1){
      defaultShips.push(ShipAttributes({
        shipIndex: i,
        name: shipNames[i],
        imageURI: shipImageURIs[i],
        hp: shipHp[i],
        maxHp: shipHp[i],
        attackDamage: shipAttackDmg[i]
      }));
      
      
      
      ShipAttributes memory c = defaultShips[i];
      
      console.log("[+] Done initializing %s with HP %s\n [+]Image URI: %s", c.name, c.hp, c.imageURI);
    }
      _tokenIds.increment();
  }
  
  
  function mintShipNFT(uint _shipIndex) external {
    uint256 newItemId = _tokenIds.current();
    
    _safeMint(msg.sender, newItemId);
    
    nftHolderAttributes[newItemId] = ShipAttributes({
      shipIndex: _shipIndex,
      name: defaultShips[_shipIndex].name,
      imageURI: defaultShips[_shipIndex].imageURI,
      hp: defaultShips[_shipIndex].hp,
      maxHp: defaultShips[_shipIndex].maxHp,
      attackDamage: defaultShips[_shipIndex].attackDamage
    });
    
    console.log("[*] Minted NFT w/ token ID: %s and characterIndex: %s", newItemId, _shipIndex);
    
    nftHolders[msg.sender] = newItemId;
    
    _tokenIds.increment();
  }
  
  
  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    ShipAttributes memory shipAttributes = nftHolderAttributes[_tokenId];
    
    string memory strHp = Strings.toString(shipAttributes.hp);
    string memory strMaxHp = Strings.toString(shipAttributes.maxHp);
    string memory strAttackDamage = Strings.toString(shipAttributes.attackDamage);
  
    string memory json = Base64.encode(
      abi.encodePacked(
        '{"name": "',
        shipAttributes.name,
        '  -- NFT #: ',
        Strings.toString(_tokenId),
        '", "description": "This is a NFT that allows people to play in the game Expanse Warships!", "image": "',
        shipAttributes.imageURI,
        '", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
        strAttackDamage, '} ]}'
      )
    );
    
    string memory output = string(abi.encodePacked("data:application/json;base64,", json));
    
    return output;
    
  }
  
  function attackBoss() public {
    uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
    ShipAttributes storage playerShip = nftHolderAttributes[nftTokenIdOfPlayer];
    
    console.log("[+] The %s is attacking the %s", playerShip.name, alienBoss.name);
    console.log("[+] %s HP: %s and AD: %s", playerShip.name, playerShip.hp, playerShip.attackDamage);
    console.log("[+] The %s has HP: %s and AD: %s", alienBoss.name, alienBoss.hp, alienBoss.attackDamage);

    require(
      playerShip.hp > 0,
      "[-] Error: The character is dead!  Must have HP to attack boss!"
    );

    require(
      alienBoss.hp > 0,
      "[-] Error: The alien boss is dead! Must have HP to attack player!"
    );

    // Allow player to attack and check to make sure we can attack the boss & set hp to 0 if attack is greater than boss hp
    if (alienBoss.hp < playerShip.attackDamage) {
      console.log("[+] %s ship has been destroyed!  %s wins!", alienBoss.name, playerShip.name);
      alienBoss.hp = 0;
    } else {
      alienBoss.hp -= playerShip.attackDamage;
    }

    // Allow boss to attack and check to make sure the boss can attack player & set hp to 0 if boss attack is greater than player hp
    if (playerShip.hp < alienBoss.attackDamage) {
      console.log("[+] %s ship has been destroyed!  %s wins!", playerShip.name, alienBoss.name);
      playerShip.hp = 0;
    } else {
      playerShip.hp -= alienBoss.attackDamage;
    }

    console.log("[+] The %s attacked the %s", playerShip.name, alienBoss.name);
    console.log("[+] %s HP: %s and AD: %s", playerShip.name, playerShip.hp, playerShip.attackDamage);
    console.log("[+] %s's HP: %s, AD: %s", alienBoss.name, alienBoss.hp, alienBoss.attackDamage);

  }
  
}

