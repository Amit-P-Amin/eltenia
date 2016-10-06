What's Needed for Functional Marketplace
-------------
1. Utility
2. Multiple Jobs
3. Marketplace

1. Food
  a. Four food types: fruits and vegetable, fish, game and grain
  b. The family class should have a food object
  c. Every tick, food should be distributed to its members
    i. Food should be distributed in a utility maximizing way
    ii. Each family member should have its own base utility function
    iii. The family should apply a multiplier to those functions
      1. The husband should get the highest multiplier; if the family is starving, the youngest child should be
         given a multiplier of zero (to be left to die)

2. Professions
  a. Add hunter class
    i. Hunts game from forest
    ii. Add forest class
  b. Add fisherman class
    i. Fishes fish from lake
    ii. Add lake class
  c. Create a base profession class
  d. Modify person class to use profession class
(create a resources folder in the model folder)

3. Marketplace
  a. Hand out currency units to each family (only on start)
  b. Each tick, for a week, the family will place a small amount of food on the marketplace
    i. The food lost to the marketplace should be assessed at utility lost (for not consuming the food)
    ii. The family should spend the money earned the last tick, buying what would give the highest utility
      1. The total utility gained from the money is the utility gained
      2. If the utility gained is larger than the utility lost, then the next week, more food should be sold
  c. The marketplace will set a random price for the food
    i. If all units are sold, increase the price; if there is inventory remaining, decrease the price
    ii. If inventory is supplied by multiple families, split the trades based on market share

Other
==========

0. Change Farmer class to indicate which methods are private

1. Store
  a. Add a score key value pair, which can be used to grant bonus ticks when a breaking change occurs
    Q: "Is there something else you want for your score? Has to be simple for me to implement."

2. Person
  a. Survival rate should be based on a combination of age and health  (or maybe that should be sickness vulnerability, which lowers health...?)
  b. Survival rate should actually be used for a 'survive' roll made once every day or week

3. Birth
  a. A married couple should have a fertility rate, based on a combination of their age and health
  b. Model pregnancy (e.g. increased appetite for female, reduced health, reduced strength)

4. Family
  a. Should save money

5. Marriage
  a. Every 5 years, the marriage tab should open up
    i. The user will be given 1 year to manually arrange marriages; otherwise marriages will happen 'naturally'
