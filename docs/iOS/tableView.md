# TableViewCell的几种重用方式的区别
## 重用机制
关于TableView的重用机制相信网上教程一堆,这里不作过多说明,但是有几个重点会说明下:

### reuseIdentifier

个人觉得最重要的一点,就是Cell的reuseIdentifier属性,其实不管你是注册nib还是class,最终的重用靠的主要是这个标识符,只有这个属性有值的Cell,在滑动出TableView后才会进入重用队列,队列有Cell,你在dequeueReusable的时候才能拿到Cell,如果你没注册,但是只要Cell有这个属性值,那么它再滑出去后也必然能被重用

### registerNib(class):forCellReuseIdentifier

上面说的注册单元格的两种方式,简称r,他们将Cell以nib或者class的形式注册,但是重点还是后面的forCellReuseIdentifier,也即是说这个Cell,会因为这个参数而赋值给reuseIdentifier属性,所以这个Cell才能被重用.

总结:重点还是reuseIdentifier,不管你注册没注册,只要你产生的Cell的属性reuseIdentifier是有值的,那么它滑动出TableView后就可以被再次重用.那registerNib(class):是干嘛用的呢,后面会再提到.


## 重用生成单元格方法
关于重用生成TableViewCell的机制这里不作多的说明,这里只是对比下几种重用方式的区别,目前重用单元格使用下面两种方法:

* dequeueReusableCellWithIdentifier:
* dequeueReusableCellWithIdentifier: forIndexPath:

这里暂且简称上面前者为方法d1,后者为d2.
这两个方法的返回值都是UITableviewCell,网上大部分的讲解或者抄袭的讲解可能说的区别仅仅是d1可能返回nil,而d2则在没有使用r方法的情况下会崩溃,这些都没问题,不然也不会有那么多抄袭的博客了.这里先说下他们的共同点和不同点:

#### 共同点
他们都会先根据identifier来复用在重用队列的单元格,且复用不到的时候会去根据r方法注册的Cell来获取新的,r方法注册的时候已经给cell了identifier,因此这两个方法新生成的cell,都会有重用标示,都可以进入重用队列(前提是使用r方法注册过),不会为nil.

#### 不同点
如果你没有使用r方法注册,在找r方法产生的cell的时候,区别就来了,因为没有用r注册,d1会返回nil,而d2则直接崩溃.


说的再细点:

#### 在使用了r方法注册的情况下

只要使用r方法注册了单元格设置了标识符(前提是注册的没问题),那么在重用的时候,不管你是用d1还是d2,只要重用不到,就返回r方法注册的带标识符的新单元格(新生成,非重用),即使你用d1来获取cell,也不会返回给你nil,这两种情况目测没发现任何区别,那么问题来了,d2方法的IndexPath参数,系统是干嘛了?好吧,其实我也不知道,官方文档是这么说的:

> This method uses the index path to perform additional configuration based on the cell’s position in the table view


所以,文档也说的不清不楚,只是说会根据位置来增加一些额外的配置信息,具体是啥信息,不知道,我查了下Stack Overflow,这个参数,老外们也是诸多疑问,如果有哪位知道具体的区别,请告知,谢谢.在使用r方法注册的前提下,两者目测并没有什么区别.既然目测没有什么区别,那自然使用d2比较合适,因为毕竟它是比较新的方法.

另外这里说下一种写法,虽然也没什么问题,但是我个人觉得不提倡:先使用d1来获取单元格,然后判断是否为空,为空的话再去注册并调用d1.说直白点就是,先不注册,先去用d1重用,为空的话就使用r注册,然后再用d1,就有了Cell了.但是其实只要只要使用了r方法且注册的是正确的,不管你是用d1和d2都不会是空,既然这样,那为何不直接在TableView对象生成完了就先使用r注册下,cellforRow直接使用d1就完了,它肯定不会是nil的,用上面这种写法其实if(!cell)里只走一次后就不会再走了.
好吧,其实说了这么多,无非想说明一点:
**只要使用了r方法且注册的nib或者class没问题,那么不管你是用d1还是d2,它始终不会是空,都会正常生成单元格.**

**结论:在使用r方法注册过的前提下,使用d2方法来重用单元格,不要使用d1(虽然d1也没问题,但是毕竟d2比较新)**

#### 不使用r方法注册的情况下
d1和d2的返回值都是UITableviewCell,前面已经说了,在这种情况下,d1返回可能是nil,而d2会崩溃.所以不使用r方法的情况下,我们直接排除掉d2,不使用d2来重用单元格,使用d1.
d1在返回的是nil的情况下该如何做呢,再重新注册?No,No,No,上面已经说过了,既然你要注册,就没必要做判断,提前注册好这里直接就不会是nil,而且我这里已经写到不使用r方法注册的情况下了,不要让我再绕回去了.说白了,**你只要想用r方法,那么就乖乖用d2就完了**.

r方法其实它的重点在于你用d方法拿不到单元格的时候,d1或者d2方法会根据r方法注册的nib或者class,生成新的单元格,并赋值identifier,那么这里其实也是一样的,在Cell为nil的时候,你只需要生成对应的单元格,且给identifier赋值即可.常规单元格使用方法:`initWithStyle: reuseIdentifier:`,它可以指定identifier,即生成的单元格是可以正常重用的.
大部分的时候我们需要使用xib来创建cell,那么可能的用法有下面几种:

    if (!cell) {
        UINib *nib = [UINib nibWithNibName:cellId bundle:nil];
        cell = [nib instantiateWithOwner:nil options:nil].firstObject;
    //        NSArray *files = [[NSBundle mainBundle] loadNibNamed:@"xx" owner:nil options:nil];
    //        cell = files.firstObject;
        CLog(@"生成了新的单元格");
    }


或者:


    if (!cell) {
    //        UINib *nib = [UINib nibWithNibName:cellId bundle:nil];
    //        cell = [nib instantiateWithOwner:nil options:nil].firstObject;
        NSArray *files = [[NSBundle mainBundle] loadNibNamed:@"xx" owner:nil options:nil];
        cell = files.firstObject;
        CLog(@"生成了新的单元格");
    }


上面两种方式姑且叫x1和x2.刚说了,新生成的Cell要能重用,重点是identifier有值,然后这两种方式都没有给identifier赋值的参数,有好多人可能直接就这么用了,这样其实根本就没重用,每次进cellforrow,使用d1方法都会得到nil,每次都会生成新的,浪费内存.那上面这两种方法拿到的cell要怎么设置它的identifier呢,很简单,需要直接在xib的cell里设置,打开cell的第四个选项卡你就可以看到Identifier了,或者还有个办法,在x1或者x2最后,直接`[cell setValue:@"xx" forKey:@"reuseIdentifier"];`

这样它在移出TableView外后就可以进入到重用队列了.

**注意:这一步非常重要,不设置标识符的话,重用没有任何意义,每次进来都会是nil,都会重新生成!**

## 最终使用方式
大部分情况下,我们都是使用xib来创建cell,根据上面的内容综合,大概可以总结出下面两种方式来重用单元格

* r+d2

使用r方法先注册,然后再使用d2重用单元格,不用判断cell是否为nil

* d1+x1 or d1+x2(xib或者代码设置identifier)

不使用r方法注册,使用d1方法重用单元格,但需要判断是否为空,为空则使用x1或者x2方法生产新的cell并设置Identifier.


很明显,第一种方式更简洁,首先在TableView初始化完后,注册,然后直接重用即可.常规来说只需要xib上做好UI即可,如果你每个界面每个TableView都是单独写的,且cell都是一个一个单独写的,那么这么写会好点.
但是我更倾向于第二种,以下是原因:

### 为什么不用r注册的方式:
假设的app是在卖某种产品,有两种类型,数据都是一个接口给的.这两种产品一种可以随意投资,算是常规产品,一种则有上限,它比常规产品多一个百分比的字段.UI上则只是这个特殊产品有个百分比的进度条,常规产品则没有进度条.
这里姑且不讨论数据结构问题,很多刚培训出来的同学可能会这么做:直接新建两套Cell类文件(两套h和m)并关联xib,连线,然后r方法注册,d2方法重用,再low一点的,d1方法重用,判断为空的话再r方法注册再d1方法重用.

既然都是同样的产品,只是类型不同,为何就不是一个类,哪怕继承与同一个父类也行,为什么要单独分开?有人可能会说,xib得要俩啊?是,新建一个类只能有一个xib,但是谁规定了一个xib不能有多个cell或者视图.如果不能的话,为什么可以拖多个cell甚至别的UIView到同一个xib里?苹果是吃饱了撑着做这个功能的?

个人建议:相同类型的UI,只建一套h.m文件,UI则放在一个xib里即可,个人觉得大部分情况下,一个TableView的cell都可以在一套h.m文件内,当然,情况比较复杂的话另当别论,具体的结构需要根据实际情况而定,像上面这种情况,只需要建一套Cell类文件(文件默认包含一个类)即可,作为常规产品,特殊产品你可以继承与它,但不要单独写h.m文件,直接就在原来的文件中写即可,一套h.m文件一个类,一个xib一个视图,那是刚培训出来的做法,你见过苹果官方的api每个类都是单独放在一个文件里?如果你的产品有n个,那文件不是得多的要死?

那如何使用呢?首先,这种情况,r方法肯定是不能用了,为什么?因为它会报错,r方法(使用nib)的时候,会根据xib的元素注册成单元格,但是前提是它能找到,如果一个xib建立了多个cell,r方法就会报错,它不知道你要用哪个,那你如果单纯是为了用r+d2方法而用,行,就建n个xib文件慢慢玩吧

所以,这种情况,使用d1+x方法即可,x方法最后cell的获取是从数组中得到的,而这个数组其实就是xib的所有文件,之前写的是数组的firstObject,现在按照下标读取即可.

所以如果是常规就一种产品的cell就那么一个UI,那么ok,可以直接r+d2,如果一种产品类型很多,则使用d1+x.

那为什么我还是选择后者,这里涉及到UITableview的封装.具体这里不多说,大概就是为了保证UITableview的效率,具体可以搜下为什么要封装UITableview.封装后,cellforrow会集中在一个地方,外部则需要告诉它诸如行高,重用标识,下标等,因为封装,所以要适合所有的可能性,所以这里必然不能使用r+d2的方法了,只能使用d1+x方法了.


### 尾文:
目前正在重写app架构,TableView也在封装,关于重用这块刚好有感而发,所以写了这么点东西,文中提到的d2方法中的indexpath参数,若真有知道具体用处的,欢迎留言,谢谢.




