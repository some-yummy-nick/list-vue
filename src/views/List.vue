<template>

    <div id="app" class="app">
        <div class="app__blocks">
            <div class="app__block">
                <label for="category">Категории расходов</label>
                <select name="date" id="category" v-model="category">
                    <option v-for="categoryItem in categories">{{categoryItem}}</option>
                </select>
            </div>
            <div class="app__block">
                <label for="time">Дата</label>
                <select name="time" id="time" v-model="time">
                    <option v-for="timeItem in times">{{timeItem}}</option>
                </select>
            </div>
        </div>
                        <ol class="app__list">
                            <li class="app__item" v-for="(item, index) in todoList">
                                <div class="app__item-wrapper" v-if="this.$store">
                                    <template v-if="!this.$store.getters.TODOS[index].editable">
                                        <div class="app__item-left">
                                            <span class='text'>{{ item.name }}</span>
                                        </div>
                                        <div class="app__item-right">
                                            <button type="button" v-on:click="enableEditing(index)">✎</button>
                                            <button type="button" v-on:click="deleteElement(index)">❌</button>
                                        </div>
                                    </template>


                                </div>
                                <div class="app__edit" v-if="this.$store">
                                    <div class="app__blocks app__edit-left app__blocks_third">
                                        <div class="app__block">
                                            <label for="editName">Название</label>
                                            <input id="editName" v-model=editableNameTemp.name class="input" />
                                        </div>
                                        <div class="app__block">
                                            <label for="editCategory">Категория</label>
                                            <input id="editCategory" v-model=editableCategoryTemp.category class="input" />
                                        </div>
                                        <div class="app__block">
                                            <label for="editTime">Дата</label>
                                            <input type="date" id="editTime" v-model=editableTimeTemp.time class="input" />
                                        </div>
                                    </div>
                                    <div class="app__edit-right">
                                        <button v-on:click="saveEdit(index)">💾</button>
                                        <button v-on:click="disableEditing(index)">⊗</button>
                                    </div>

                                </div>
                            </li>
                        </ol>

        <!--                <div class="app__blocks">-->
        <!--                    <div class="app__block">-->
        <!--                        <label for="category">Категории расходов</label>-->
        <!--                        <select name="date" id="category" v-model="category">-->
        <!--                            <option v-for="(categoryItem, index) in categories">{{categoryItem}}</option>-->
        <!--                        </select>-->
        <!--                    </div>-->
        <!--                    <div class="app__block">-->
        <!--                        <label for="time">Дата</label>-->
        <!--                        <select name="time" id="time" v-model="time">-->
        <!--                            <option v-for="(timeItem, index) in times">{{timeItem}}</option>-->
        <!--                        </select>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <ol class="app__list">-->
        <!--                    <li class="app__item" v-for="(item, index) in todoList">-->
        <!--                        <div class="app__item-wrapper" v-if="!this.$store.getters.TODOS[index].editable">-->
        <!--                            <div class="app__item-left">-->
        <!--                                <span class='text'>{{ item.name }}</span>-->
        <!--                            </div>-->
        <!--                            <div class="app__item-right">-->
        <!--                                <button type="button" v-on:click="enableEditing(index)">✎</button>-->
        <!--                                <button type="button" v-on:click="deleteElement(index)">❌</button>-->
        <!--                            </div>-->

        <!--                        </div>-->
        <!--                        <div class="app__edit" v-if="this.$store.getters.TODOS[index].editable">-->
        <!--                            <div class="app__blocks app__edit-left app__blocks_third">-->
        <!--                                <div class="app__block">-->
        <!--                                    <label for="editName">Название</label>-->
        <!--                                    <input id="editName" v-model=editableNameTemp.name class="input" />-->
        <!--                                </div>-->
        <!--                                <div class="app__block">-->
        <!--                                    <label for="editCategory">Категория</label>-->
        <!--                                    <input id="editCategory" v-model=editableCategoryTemp.category class="input" />-->
        <!--                                </div>-->
        <!--                                <div class="app__block">-->
        <!--                                    <label for="editTime">Дата</label>-->
        <!--                                    <input type="date" id="editTime" v-model=editableTimeTemp.time class="input" />-->
        <!--                                </div>-->
        <!--                            </div>-->
        <!--                            <div class="app__edit-right">-->
        <!--                                <button v-on:click="saveEdit(index)">💾</button>-->
        <!--                                <button v-on:click="disableEditing(index)">⊗</button>-->
        <!--                            </div>-->

        <!--                        </div>-->
        <!--                    </li>-->
        <!--                </ol>-->
        <!--                <div class="app__add">-->
        <!--                    <div class="app__blocks app__blocks_third">-->
        <!--                        <div class="app__block">-->
        <!--                            <label for="addName">Название</label>-->
        <!--                            <input type="text" id="addName" v-model="newItemName" />-->
        <!--                        </div>-->
        <!--                        <div class="app__block">-->
        <!--                            <label for="addCategory">Категория</label>-->
        <!--                            <input type="text" id="addCategory" v-model="newItemCategory" />-->
        <!--                        </div>-->
        <!--                        <div class="app__block">-->
        <!--                            <label for="addTime">Дата</label>-->
        <!--                            <input type="date" id="addTime" v-model="newItemTime" />-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <button v-on:click="addElement(newItemName,newItemCategory,newItemTime)">Добавить</button>-->
        <!--                </div>-->
    </div>

</template>
<script>
    module.exports = {
        data() {
            return {
                newItem: "",
                newItemName: "",
                newItemCategory: "",
                newItemTime: new Date().toISOString().substr(0, 10),
                category: "",
                categoriesList: [],
                time: "",
                timesList: [],
                editableNameTemp: null,
                editableCategoryTemp: null,
                editableTimeTemp: null
            };
        },
        addElement: function (newItemName, newItemCategory, newItemTime) {
            if (newItemName !== "" && newItemCategory !== "") {
                this.$store.getters.TODOS.push({
                    name: newItemName,
                    category: newItemCategory,
                    time: newItemTime,
                    editable: false
                });
                this.newItemName = "";
                this.newItemCategory = "";
            }
        },
        deleteElement: function (index) {
            let thisCategory = this.category;
            let thisTime = this.time;
            let newMock = this.$store.getters.TODOS.filter(function (item) {
                return item.category === thisCategory && item.time === thisTime;
            });

            let deleteItem = newMock.splice(index, 1)[0];
            let setArr = this.$store.getters.TODOS;
            for (let [i, item] of setArr.entries()) {
                if (deleteItem.name == item.name) {
                    setArr.splice(i, 1);
                }
            }
        },
        enableEditing: function (index) {
            let thisCategory = this.category;
            let thisTime = this.time;
            let newMock = this.$store.getters.TODOS.filter(function (item) {
                return item.category === thisCategory && item.time === thisTime;
            });
            this.editableNameTemp = newMock[index];
            this.editableCategoryTemp = newMock[index];
            this.editableTimeTemp = newMock[index];
            this.$store.getters.TODOS[index].editable = true;
        },
        disableEditing: function (index) {
            this.editableNameTemp = null;
            this.editableCategoryTemp = null;
            this.editableTimeTemp = null;
            this.$store.getters.TODOS[index].editable = false;
        },
        saveEdit: function (index) {
            this.$store.getters.TODOS[index] = this.editableNameTemp;
            this.$store.getters.TODOS[index] = this.editableCategoryTemp;
            this.$store.getters.TODOS[index] = this.editableTimeTemp;
            this.disableEditing(index);
        },
        mounted() {
            this.$store.dispatch('GET_TODO');
        },
        computed: {
            todoList: function () {
                if (this.$store.getters.TODOS) {
                    let end = this.$store.getters.TODOS.length + 1;
                    let thisCategory = this.category;
                    let thisTime = this.time;
                    let newMock = this.$store.getters.TODOS.filter(function (item) {
                        return item.category === thisCategory && item.time === thisTime;
                    });
                    let newArr = new Set(newMock.slice(this.start, end));
                    return [...newArr];
                }

            },
            categories: function () {
                if (this.$store.getters.TODOS) {
                    this.categoriesList = new Set(
                        this.$store.getters.TODOS.map(function (item) {
                            return item.category;
                        })
                    );
                    this.category = this.categoriesList.values().next().value;
                    return [...this.categoriesList];
                }

            },
            times: function () {
                if (this.$store.getters.TODOS) {
                    this.timesList = new Set(
                        this.$store.getters.TODOS.map(function (item) {
                            return item.time;
                        })
                    );
                    this.time = this.timesList.values().next().value;
                    return [...this.timesList];
                }
            }
        }
    };
</script>
